import React, { memo, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

// Internal styles and theme
import styles from './styles';
import COLORS from '../../theme';

export interface YasButtonProps {
  /** Callback function when button is pressed */
  onPress: () => void;
  /** Additional styles to apply to the button container */
  additionalStyle?: StyleProp<ViewStyle>;
  /** @deprecated Use additionalStyle instead */
  additonalStyle?: StyleProp<ViewStyle>;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether to show loading indicator */
  fetching?: boolean;
  /** Text to display on the button */
  text?: string;
  /** Icon to display on the button */
  icon?: ImageSourcePropType;
  /** Custom styles for the button text */
  textStyle?: StyleProp<TextStyle>;
  /** Custom styles for the icon */
  iconStyle?: StyleProp<ImageStyle>;
  /** Color of the loading indicator (defaults to theme primary color) */
  loaderColor?: string;
  /** Custom primary color to override theme */
  primaryColor?: string;
  /** Custom disabled background color to override theme */
  disabledColor?: string;
  /** Debounce time in milliseconds to prevent multiple clicks (default: 1000) */
  debounceTime?: number;
  /** Active opacity when pressing the button (default: 0.8) */
  activeOpacity?: number;
}

/**
 * YasButton - A customizable button component for React Native
 * 
 * @example
 * ```tsx
 * import { YasButton } from 'react-native-yastools';
 * 
 * <YasButton
 *   text="Click Me"
 *   onPress={() => console.log('Pressed!')}
 *   primaryColor="#FF6B6B"
 * />
 * ```
 */
const YasButton: React.FC<YasButtonProps> = ({
  onPress,
  additionalStyle,
  additonalStyle, // Support legacy prop name
  disabled,
  fetching,
  text,
  textStyle,
  icon,
  iconStyle,
  loaderColor,
  primaryColor,
  disabledColor,
  debounceTime = 1000,
  activeOpacity = 0.8,
}) => {
  const lastPressTime = useRef(0);

  const handlePress = () => {
    // Prevent multiple clicks with configurable debounce
    const now = Date.now();
    if (now - lastPressTime.current < debounceTime) {
      return;
    }
    lastPressTime.current = now;
    onPress();
  };

  // Determine container style based on state
  const containerStyle: StyleProp<ViewStyle> = [
    disabled ? styles.disabled : styles.container,
    // Apply custom colors if provided
    !disabled && primaryColor && { backgroundColor: primaryColor },
    disabled && disabledColor && { backgroundColor: disabledColor },
    // Support both prop names for backwards compatibility
    additionalStyle || additonalStyle,
  ];

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={activeOpacity}
      disabled={disabled || fetching}
    >
      <View style={containerStyle}>
        {fetching ? (
          <ActivityIndicator
            size="small"
            color={loaderColor || primaryColor || COLORS.primary}
          />
        ) : (
          <>
            {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
            {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(YasButton);
