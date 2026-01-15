import React, { memo, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  View,
  Image,
} from 'react-native';

// Internal styles and theme
import styles from './styles';
import COLORS from '../../theme';
import { YasButtonProps } from './type';

export type { YasButtonProps };


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
  testID,
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
      <View style={containerStyle} testID={testID}>
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
