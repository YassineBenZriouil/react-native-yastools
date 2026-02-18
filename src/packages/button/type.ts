import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";

export interface ButtonProps {
  /** Callback function when button is pressed */
  onPress: () => void;
  /** Additional styles to apply to the button container */
  additionalStyle?: StyleProp<ViewStyle>;
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
  /** Test ID for testing purposes */
  testID?: string;
  /**
   * Scale value to animate to when pressed (0 to 1).
   * If undefined, no scaling animation occurs.
   * @example 0.95
   */
  animateScale?: number;
}
