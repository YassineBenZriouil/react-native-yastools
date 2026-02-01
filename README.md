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

> **Note:** Ensure you have `react-native-reanimated` installed if you plan to use advanced animations.

---

## Components

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
