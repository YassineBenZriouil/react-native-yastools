import React, { memo, useMemo, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  View,
  Image,
  Animated,
} from 'react-native';

// Internal styles and theme
import styles from './styles';
import COLORS from '../../theme';
import { ButtonProps } from './type';
import { preventMultiPress, usePressScale } from '../../utils/interactions';

export type { ButtonProps };

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

/**
 * Button - A customizable button component for React Native
 * 
 * @example
 * ```tsx
 * import { Button } from 'react-native-yastools';
 * 
 * <Button
 *   text="Click Me"
 *   onPress={() => console.log('Pressed!')}
 *   primaryColor="#FF6B6B"
 * />
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  onPress,
  additionalStyle,
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
  animateScale,
}) => {
  // Keep latest onPress in a ref to avoid resetting the debouncer closure when onPress changes
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  // Setup interactions
  // Default to 1 (no scaling) if not provided.
  const { scaleAnim, handlePressIn, handlePressOut } = usePressScale(animateScale ?? 1);

  // Check if animation is requested
  const isAnimated = animateScale !== undefined;

  // Memoize the handler so existing debounce timer isn't lost on re-renders
  const handlePress = useMemo(() => {
    // If debounceTime is 0 or less, just call directly (or use logic if user wants default protection)
    // Assuming if user passes 0 they want NO debounce. But existing code defaulted to 1000.
    if (debounceTime > 0) {
      return preventMultiPress(() => onPressRef.current && onPressRef.current(), debounceTime);
    }
    return () => onPressRef.current && onPressRef.current();
  }, [debounceTime]);

  // Determine container style based on state
  const containerStyle: StyleProp<ViewStyle> = [
    disabled ? styles.disabled : styles.container,
    // Apply custom colors if provided
    !disabled && primaryColor && { backgroundColor: primaryColor },
    disabled && disabledColor && { backgroundColor: disabledColor },
    // Support both prop names for backwards compatibility
    additionalStyle
  ];

  // Combine animated style
  const animatedStyle = isAnimated ? { transform: [{ scale: scaleAnim }] } : undefined;

  return (
    <AnimatedTouchableOpacity
      onPress={handlePress}
      onPressIn={isAnimated ? handlePressIn : undefined}
      onPressOut={isAnimated ? handlePressOut : undefined}
      activeOpacity={activeOpacity}
      disabled={disabled || fetching}
      style={[animatedStyle]}
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
    </AnimatedTouchableOpacity>
  );
};

export default memo(Button);
