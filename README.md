<p align="center">
  <h1 align="center">⚡ React Native Yastools</h1>
  <p align="center">
    Premium, production-ready UI components for React Native.<br/>
    Modular by design — install everything, or just what you need.
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-yastools"><img src="https://img.shields.io/npm/v/react-native-yastools?style=flat-square&color=007AFF" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/react-native-yastools"><img src="https://img.shields.io/npm/l/react-native-yastools?style=flat-square" alt="license" /></a>
  <a href="https://github.com/YassineBenZriouil/react-native-yastools"><img src="https://img.shields.io/github/stars/YassineBenZriouil/react-native-yastools?style=flat-square" alt="stars" /></a>
</p>

---

## Why Yastools?

Most component libraries force you to install the kitchen sink. Yastools gives you the **full buffet** or **just the appetizer** — your call.

Every component is built on a shared **core** _(the backbone, the spine, the thing that holds it all together — you might say it's... **core** to the experience)_. Install one component and core comes along for the ride. Install them all and core is smart enough to only show up once.

### ✨ Highlights

- **🧩 Modular** — Install only what you use. No bloat.
- **🎨 Themable** — Unified design tokens. Override everything.
- **⚡ Performant** — Native animations, spring physics, no jank.
- **🛡️ Safe by Default** — Built-in debounce, double-tap protection, loading states.
- **📦 Zero Config** — Drop in, pass props, ship.

---

## Installation

### Full Package (everything)

```bash
npm install react-native-yastools
```

This installs **all components** + the core design system + all dependencies.

### Individual Components (à la carte)

Only need a button? Don't pay for a media player:

```bash
npm install @react-native-yastools/button
```

This installs **only the Button** + core. Nothing else.

| Package | What you get |
|---------|-------------|
| `react-native-yastools` | Everything below 👇 |
| `@react-native-yastools/button` | Button + Core |
| `@react-native-yastools/checkbox` | CheckBox + Core |
| `@react-native-yastools/bottom-tabs` | BottomTabs + Core |
| `@react-native-yastools/confirmation-popup` | ConfirmationPopUp + Core |
| `@react-native-yastools/media-view` | MediaView + Core + `react-native-video` + `zoomable-view` |

> **Note:** `MediaView` has native dependencies. After installing, run `npx pod-install` (iOS) and rebuild.

---

## Components

### 🔘 Button

A versatile button with loading states, spring animations, and built-in debounce protection.

```tsx
import { Button } from 'react-native-yastools';
// or: import Button from '@react-native-yastools/button';

<Button
  text="Confirm Order"
  onPress={handleCheckout}
  primaryColor="#007AFF"
  animateScale={0.95}
  debounceTime={500}
  fetching={isLoading}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `() => void` | **required** | Press callback |
| `text` | `string` | — | Button label |
| `icon` | `ImageSourcePropType` | — | Icon image |
| `fetching` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable interactions |
| `primaryColor` | `string` | theme | Background color |
| `disabledColor` | `string` | theme | Disabled background |
| `animateScale` | `number` | — | Press scale (e.g. `0.95`) |
| `debounceTime` | `number` | `1000` | Debounce delay (ms) |
| `activeOpacity` | `number` | `0.8` | Touch opacity |
| `additionalStyle` | `ViewStyle` | — | Container overrides |
| `textStyle` | `TextStyle` | — | Text overrides |
| `iconStyle` | `ImageStyle` | — | Icon overrides |
| `loaderColor` | `string` | theme | Spinner color |

---

### ☑️ CheckBox

A clean checkbox with label support, color customization, and flexible styling.

```tsx
import { CheckBox } from 'react-native-yastools';
// or: import CheckBox from '@react-native-yastools/checkbox';

<CheckBox
  checked={isChecked}
  onToggle={(val) => setIsChecked(val)}
  label="I agree to the Terms"
  activeColor="#00E676"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | **required** | Checked state |
| `onToggle` | `(checked: boolean) => void` | **required** | Toggle callback |
| `label` | `string` | — | Label text |
| `disabled` | `boolean` | `false` | Disable interactions |
| `activeColor` | `string` | theme | Checked color |
| `inactiveColor` | `string` | theme | Unchecked color |
| `checkColor` | `string` | `#FFFFFF` | Checkmark color |
| `containerStyle` | `ViewStyle` | — | Container overrides |
| `labelStyle` | `TextStyle` | — | Label overrides |
| `boxStyle` | `ViewStyle` | — | Box overrides |

---

### 📑 BottomTabs

A customizable bottom navigation bar with active scaling, label control, and full styling flexibility.

```tsx
import { BottomTabs } from 'react-native-yastools';
// or: import BottomTabs from '@react-native-yastools/bottom-tabs';

const tabs = [
  { name: 'Home', route: 'Home', icon: require('./assets/home.png') },
  { name: 'Profile', route: 'Profile', icon: require('./assets/profile.png') },
];

<BottomTabs
  navigation={navigation}
  currentRoute="Home"
  tabs={tabs}
  activeColor="#007AFF"
  activeScale={1.3}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navigation` | `any` | **required** | React Navigation object |
| `currentRoute` | `string` | **required** | Active route name |
| `tabs` | `TabItem[]` | **required** | Array of tab definitions |
| `activeColor` | `string` | theme | Active tab color |
| `inactiveColor` | `string` | theme | Inactive tab color |
| `activeScale` | `number \| boolean` | — | Scale active tab (`true` = 1.3) |
| `showLabel` | `boolean` | `true` | Show/hide all labels |
| `activeShowLabel` | `boolean` | — | Show active tab label |
| `inactiveShowLabel` | `boolean` | — | Show inactive tab labels |
| `containerStyle` | `ViewStyle` | — | Bar container overrides |
| `tabItemStyle` | `ViewStyle` | — | Tab item overrides |
| `activeTabItemStyle` | `ViewStyle` | — | Active tab overrides |
| `textStyle` | `TextStyle` | — | Label text overrides |
| `activeTextStyle` | `TextStyle` | — | Active label overrides |
| `iconStyle` | `ImageStyle` | — | Icon overrides |
| `activeIconStyle` | `ImageStyle` | — | Active icon overrides |
| `onTabPress` | `(route: string) => void` | — | Custom press handler |

**TabItem:**
```ts
{ name: string, route: string, icon: ImageSourcePropType, activeIcon?: ImageSourcePropType, disabled?: boolean }
```

---

### ⚠️ ConfirmationPopUp

A modal confirmation dialog with built-in loading state and action buttons (powered by Yastools Button under the hood).

```tsx
import { ConfirmationPopUp } from 'react-native-yastools';
// or: import ConfirmationPopUp from '@react-native-yastools/confirmation-popup';

<ConfirmationPopUp
  visible={isVisible}
  title="Delete Account?"
  message="This action cannot be undone."
  onConfirm={deleteUser}
  onClose={() => setVisible(false)}
  confirmText="Delete"
  cancelText="Keep"
  loading={isDeleting}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Show/hide the popup |
| `title` | `string` | **required** | Dialog title |
| `message` | `string` | **required** | Dialog message |
| `onConfirm` | `() => void` | **required** | Confirm callback |
| `onClose` | `() => void` | **required** | Cancel/close callback |
| `confirmText` | `string` | `"Confirm"` | Confirm button label |
| `cancelText` | `string` | `"Cancel"` | Cancel button label |
| `showCloseButton` | `boolean` | `true` | Show X button |
| `loading` | `boolean` | `false` | Loading state |
| `animationType` | `'none' \| 'slide' \| 'fade'` | `'fade'` | Modal animation |

---

### 🖼️ MediaView

A fullscreen media viewer for images and videos. Supports pinch-to-zoom, custom close buttons, and backdrop dismiss.

```tsx
import { MediaView } from 'react-native-yastools';
// or: import MediaView from '@react-native-yastools/media-view';

<MediaView
  visible={isOpen}
  source={{ uri: 'https://example.com/photo.jpg' }}
  type="image"
  onClose={() => setIsOpen(false)}
  zoomableImage={true}
  exitOnBackDropClick={true}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Show/hide viewer |
| `source` | `ImageSourcePropType` | **required** | Image or video source |
| `type` | `'image' \| 'video'` | **required** | Media type |
| `onClose` | `() => void` | **required** | Close callback |
| `zoomableImage` | `boolean` | `false` | Enable pinch-to-zoom |
| `exitOnBackDropClick` | `boolean` | `false` | Close on backdrop tap |
| `animationType` | `'fade' \| 'slide' \| 'none'` | `'fade'` | Entry animation |
| `closeIcon` | `ImageSourcePropType` | built-in | Custom close icon |
| `closeButtonStyle` | `ViewStyle` | — | Close button overrides |
| `closeIconStyle` | `ImageStyle` | — | Close icon overrides |

> **Requires:** `react-native-video` and `@dudigital/react-native-zoomable-view`

---

## Core

Every component sits on top of `@react-native-yastools/core` — a shared foundation of theme tokens, hooks, and interaction utilities. You never install it directly; it comes automatically with any component.

### Theme Tokens

```tsx
import { COLORS, FONT_FAMILY, FONT_SIZES } from 'react-native-yastools';

const style = {
  color: COLORS.primary,        // '#007AFF'
  fontFamily: FONT_FAMILY.InterSemiBold,
  fontSize: FONT_SIZES.f16,     // 16
};
```

### Interaction Utilities

```tsx
import {
  preventMultiPress,
  usePressScale,
  useStatusBarColor,
  useCustomScroll,
  CustomScrollIndicator,
  displayToast,
  defaultShadowStyle,
} from 'react-native-yastools';
```

| Export | Type | What it does |
|--------|------|-------------|
| `preventMultiPress(fn, delay?)` | function | Wraps a handler with debounce (default 500ms) |
| `usePressScale(scale?)` | hook | Returns spring animation handlers for press scaling |
| `useStatusBarColor(color, ...)` | hook | Dynamically sets status bar color per screen |
| `useCustomScroll()` | hook | Custom scrollbar indicator state & scroll handlers |
| `CustomScrollIndicator` | component | Renders a custom scroll thumb |
| `displayToast(msg)` | function | Cross-platform toast (Android) / alert (iOS) |
| `defaultShadowStyle` | object | Consistent shadow/elevation preset |

---

## Peer Dependencies

All packages require:

```json
{
  "react": ">=17.0.0",
  "react-native": ">=0.64.0"
}
```

---

## Architecture

```
react-native-yastools (umbrella)
├── @react-native-yastools/core          ← theme, hooks, utilities
├── @react-native-yastools/button        ← depends on core
├── @react-native-yastools/checkbox      ← depends on core
├── @react-native-yastools/bottom-tabs   ← depends on core
├── @react-native-yastools/confirmation-popup  ← depends on core + button
└── @react-native-yastools/media-view    ← depends on core + native video libs
```

Each package is independently versioned and installable. The umbrella package (`react-native-yastools`) installs all of them.

---

## Contributing

1. Clone the repo
2. Run `npm install`
3. Make changes in `src/`
4. Run `npm test` to verify (31 tests across 5 suites)
5. Run `npm run publish-all` to build, test, and publish via yalc

---

<p align="center">
  Built with ☕ by <a href="https://ybz.vercel.app/"><strong>Yassine Ben Zriouil</strong></a>
</p>
