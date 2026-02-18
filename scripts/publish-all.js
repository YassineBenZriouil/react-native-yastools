const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGES_DIR = path.join(__dirname, '../src/packages');
const CORE_DIR = path.join(__dirname, '../src/core');
const DIST_DIR = path.join(__dirname, '../dist');

// Get the target package from arguments
const targetPkg = process.argv[2];

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function replaceCoreImports(filePath, relativeCorePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Replace @react-native-yastools/core with relative path
    // Need to handle both quotes and single quotes
    const newContent = content.replace(/['"]@react-native-yastools\/core([^'"]*)['"]/g, (match, p1) => {
        // p1 is the subpath, e.g. "/theme" or "" or "/utils/interactions"
        // If relativeCorePath is "./core", and p1 is "/theme", result should be "./core/theme"
        const cleanPath = relativeCorePath.replace(/\/$/, '') + (p1 || '');
        // Ensure we use the correct quote style from the match, but match includes quotes so we reconstruct
        const quote = match[0];
        return `${quote}${cleanPath}${quote}`;
    });

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`  📝 Updated imports in ${path.basename(filePath)}`);
    }
}

function processFilesRecursive(dir, relativeCorePath) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // For subdirectories, the relative path to core needs another "../"
            // But WAIT, if we copied core to "dist/core", and we are in "dist/subdir",
            // core is at "../core".
            // We need to calculate relative path from fullPath to (dir/../core) effectively.
            // Actually, simplest is to pass computed relative path.
            // If base is "./core", subdir is "../core".
            processFilesRecursive(fullPath, '../' + relativeCorePath);
        } else if (file.endsWith('.js') || file.endsWith('.d.ts')) {
            replaceCoreImports(fullPath, relativeCorePath);
        }
    });
}

function prepareAndPublish(pkgName, pkgPath, distPath) {
    const targetDist = path.join(pkgPath, 'dist');

    if (fs.existsSync(distPath)) {
        console.log(`🚚 Preparing dist for ${pkgName}...`);
        if (fs.existsSync(targetDist)) {
            fs.rmSync(targetDist, { recursive: true, force: true });
        }
        copyRecursiveSync(distPath, targetDist);

        // Bundle core inside the package if it's not the core package itself
        if (pkgName !== 'core') {
            const coreDistSource = path.join(DIST_DIR, 'core');
            // Copy core into the package's dist folder as "_core_internal" to avoid naming conflicts
            const coreDistTarget = path.join(targetDist, '_core_internal');

            if (fs.existsSync(coreDistSource)) {
                console.log(`  📦 Bundling core into ${pkgName}...`);
                copyRecursiveSync(coreDistSource, coreDistTarget);

                // Rewrite imports
                // The core is at ./_core_internal relative to the root of dist
                processFilesRecursive(targetDist, './_core_internal');
            } else {
                console.warn(`  ⚠️ Core dist not found at ${coreDistSource}. Skipping bundling.`);
            }
        }
    }

    console.log(`\n📦 Publishing ${pkgName}...`);
    try {
        execSync('yalc publish --push', { cwd: pkgPath, stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ Failed to publish ${pkgName}:`, error.message);
    }
}

if (targetPkg) {
    console.log(`🚀 Starting yalc publish for specific package: ${targetPkg}...`);
} else {
    console.log('🚀 Starting dynamic yalc publish for all packages...');
}

// Publish core if target matches or no target
if (!targetPkg || targetPkg === 'core') {
    if (fs.existsSync(path.join(CORE_DIR, 'package.json'))) {
        prepareAndPublish('core', CORE_DIR, path.join(DIST_DIR, 'core'));
    }
}

// Filter packages based on whether a target was specified
const packages = fs.readdirSync(PACKAGES_DIR).filter(f => {
    const pkgPath = path.join(PACKAGES_DIR, f);
    const isDir = fs.statSync(pkgPath).isDirectory();
    const hasPkgJson = fs.existsSync(path.join(pkgPath, 'package.json'));

    // If targetPkg is specified, only include that one. Otherwise include all.
    const matchesTarget = !targetPkg || f === targetPkg;

    return isDir && hasPkgJson && matchesTarget;
});

if (packages.length === 0 && (!targetPkg || targetPkg !== 'core')) {
    console.error(`❌ No matching packages found${targetPkg ? ` for "${targetPkg}"` : ''}.`);
    process.exit(1);
}

packages.forEach(pkg => {
    const pkgPath = path.join(PACKAGES_DIR, pkg);
    prepareAndPublish(pkg, pkgPath, path.join(DIST_DIR, 'packages', pkg));
});

console.log(`\n✅ ${targetPkg ? targetPkg : 'All packages'} processed!`);

// Cleanup: Remove temporary dist folders from packages to avoid test interference
console.log(`\n🧹 Cleaning up temporary dist folders...`);
if (!targetPkg || targetPkg === 'core') {
    const coreDist = path.join(CORE_DIR, 'dist');
    if (fs.existsSync(coreDist)) {
        fs.rmSync(coreDist, { recursive: true, force: true });
    }
}
packages.forEach(pkg => {
    const pkgDist = path.join(PACKAGES_DIR, pkg, 'dist');
    if (fs.existsSync(pkgDist)) {
        fs.rmSync(pkgDist, { recursive: true, force: true });
    }
});
console.log(`✨ Cleanup complete!`);
