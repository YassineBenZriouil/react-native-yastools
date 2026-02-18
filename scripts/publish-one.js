const { execSync } = require('child_process');

const pkgName = process.argv[2];

if (!pkgName) {
    console.error('❌ Please specify a package name: npm run pub-one <package-name>');
    process.exit(1);
}

try {
    console.log(`\n🧪 Running tests for ${pkgName}...`);
    // Run jest with the package name as a pattern to only run relevant tests
    execSync(`npm test -- ${pkgName}`, { stdio: 'inherit' });

    console.log(`\n🏗️ Building project...`);
    execSync('npm run build', { stdio: 'inherit' });

    console.log(`\n📦 Publishing ${pkgName} to yalc...`);
    execSync(`node scripts/publish-all.js ${pkgName}`, { stdio: 'inherit' });

    console.log(`\n✅ ${pkgName} published successfully!`);
} catch (error) {
    console.error(`\n❌ Step failed:`, error.message);
    process.exit(1);
}
