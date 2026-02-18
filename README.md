# React Native Yastools

A collection of **premium, high-performance** UI components and utilities for React Native. Built for speed, aesthetics, and developer experience.

## Features

*   **Themable:** Fully customizable design system.
*   **Performant:** Optimized for high frame rates and smooth interactions.
*   **Native Feel:** Haptic feedback and native animations baked in.
*   **Plug & Play:** Zero-config components ready to drop into your app.

---

## Installation

```bash
npm install react-native-yastools
# or
yarn add react-native-yastools
```

### Sub-path Imports (Recommended)
You can import components individually to reduce bundle size and avoid installing unnecessary dependencies:

```tsx
import MediaView from 'react-native-yastools/MediaView';
import Button from 'react-native-yastools/Button';
```

> **Note:** This package uses a modular structure. When using sub-path imports, you only pull in the dependencies required for that specific component. For example, `MediaView` requires `react-native-video`, but `Button` does not. 
> 
> For `MediaView`, you may still need to run `npx pod-install` (iOS) and rebuild your project to link the native modules.

---

## Components

### MediaView
A premium modal component for previewing images and videos with support for zooming and custom transitions.

```tsx
import { MediaView } from 'react-native-yastools';

<MediaView
  visible={isOpen}
  source={{ uri: 'https://example.com/image.jpg' }}
  type="image"
  onClose={() => setIsOpen(false)}
  zoomableImage={true} // Enable pinch-to-zoom
  exitOnBackDropClick={true}
/>
```

### Button
A highly versatile button with built-in loading states, scaling animations, and debounce protection.

```tsx
import { Button } from 'react-native-yastools';

<Button 
  text="Confirm Order"
  onPress={handleCheckout}
  primaryColor="#007AFF"
  animateScale={0.95} // Smooth press animation
  debounceTime={500}  // Prevents double-taps
  fetching={isLoading}
/>
```

### ConfirmationPopUp
A beautiful, promise-based confirmation dialog.

```tsx
import { ConfirmationPopUp } from 'react-native-yastools';

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

### CheckBox
A customizable checkbox with label support and flexible styling.

```tsx
import { CheckBox } from 'react-native-yastools';

<CheckBox
  checked={isChecked}
  onToggle={(val) => setIsChecked(val)}
  label="I agree to the Terms"
  activeColor="#00E676"
  disabled={false}
/>
```

### BottomTabs
A customizable bottom navigation bar to easily manage app routing.

```tsx
import { BottomTabs } from 'react-native-yastools';

const tabs = [
  { name: 'Home', route: 'Home', icon: require('./assets/home.png') },
  { name: 'Profile', route: 'Profile', icon: require('./assets/profile.png') },
];

<BottomTabs
  navigation={navigation} // React Navigation prop
  currentRoute="Home"
  tabs={tabs}
  activeColor="#007AFF"
/>
```

---

## Theme & Utils

The library exposes its core theme and interaction helpers:

```tsx
import { COLORS, preventMultiPress } from 'react-native-yastools';

// Use standard colors
const myStyle = { color: COLORS.primary };

// Wrap your own handlers
const safeHandler = preventMultiPress(() => console.log('Safe!'), 1000);
```

---

Built by [**Yassine Ben Zriouil**](https://ybz.vercel.app/).


## Contributing

1.  Clone the repo
2.  Run `npm install`
3.  Test changes with `npm run local-publish`
