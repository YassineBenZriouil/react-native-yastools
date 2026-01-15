# Yastools React Native Utils

[![CI](https://github.com/YassineBenZriouil/react-native-yastools/actions/workflows/ci.yml/badge.svg)](https://github.com/YassineBenZriouil/react-native-yastools/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/react-native-yastools.svg)](https://www.npmjs.com/package/react-native-yastools)

A collection of reusable React Native utility components.

## Installation

```bash
npm install react-native-yastools
# or
yarn add react-native-yastools
```

### Peer Dependencies

This package requires the following peer dependencies to be installed in your project:

- `react` >= 17.0.0
- `react-native` >= 0.64.0

## Components

### YasButton

A customizable button component with built-in loading state, debounce functionality, and theming support.

#### Basic Usage

```tsx
import { YasButton } from 'react-native-yastools';

const MyComponent = () => {
  return (
    <YasButton
      text="Click Me"
      onPress={() => console.log('Button pressed!')}
    />
  );
};
```

#### With Loading State

```tsx
import { YasButton } from 'react-native-yastools';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    await someAsyncOperation();
    setLoading(false);
  };

  return (
    <YasButton
      text="Submit"
      onPress={handlePress}
      fetching={loading}
      loaderColor="#FFFFFF"
    />
  );
};
```

#### With Custom Styling

```tsx
import { YasButton } from 'react-native-yastools';

const MyComponent = () => {
  return (
    <YasButton
      text="Custom Button"
      onPress={() => {}}
      primaryColor="#FF6B6B"
      disabledColor="#CCCCCC"
      additionalStyle={{
        width: 200,
        height: 60,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
    />
  );
};
```

#### With Icon

```tsx
import { YasButton } from 'react-native-yastools';

const MyComponent = () => {
  return (
    <YasButton
      text="Settings"
      icon={require('./assets/settings-icon.png')}
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `() => void` | **Required** | Callback function when button is pressed |
| `text` | `string` | `undefined` | Text to display on the button |
| `icon` | `ImageSourcePropType` | `undefined` | Icon to display on the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `fetching` | `boolean` | `false` | Whether to show loading indicator |
| `additionalStyle` | `StyleProp<ViewStyle>` | `undefined` | Additional styles for the button container |
| `textStyle` | `StyleProp<TextStyle>` | `undefined` | Custom styles for the button text |
| `iconStyle` | `StyleProp<ImageStyle>` | `undefined` | Custom styles for the icon |
| `loaderColor` | `string` | Theme primary | Color of the loading indicator |
| `primaryColor` | `string` | `#007AFF` | Custom primary/background color |
| `disabledColor` | `string` | `#E5E5E5` | Custom disabled background color |
| `debounceTime` | `number` | `1000` | Debounce time in ms to prevent multiple clicks |
| `activeOpacity` | `number` | `0.8` | Opacity when pressing the button |
| `testID` | `string` | `undefined` | Test ID for testing purposes |

## Theme Customization

You can import the default theme values to use in your own components:

```tsx
import { COLORS, FONT_SIZES, FONT_FAMILY } from 'react-native-yastools';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: FONT_SIZES.f16,
  },
});
```

## Development

### Running Tests

```bash
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Building

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
