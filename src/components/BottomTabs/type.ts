import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

/**
 * Represents a single tab item in the BottomTabs component
 */
export interface TabItem {
  /** Display name shown below the icon */
  name: string;
  /** Route name to navigate to when tab is pressed */
  route: string;
  /** Icon to display for the tab (required) */
  icon: ImageSourcePropType;
  /** Optional: Active state icon (if different from default) */
  activeIcon?: ImageSourcePropType;
  /** Optional: Whether this tab is disabled */
  disabled?: boolean;
  /** Optional: Test ID for testing purposes */
  testID?: string;
}

/**
 * Props for the BottomTabs component
 */
export interface BottomTabsProps {
  /** Navigation object from React Navigation */
  navigation: any;
  /** Currently active route name */
  currentRoute: string;
  /** Array of tab items to render */
  tabs: TabItem[];
  /** Optional: Custom styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Optional: Custom styles for tab items */
  tabItemStyle?: StyleProp<ViewStyle>;
  /** Optional: Custom styles for active tab items */
  activeTabItemStyle?: StyleProp<ViewStyle>;
  /** Optional: Custom styles for tab text */
  textStyle?: StyleProp<TextStyle>;
  /** Optional: Custom styles for active tab text */
  activeTextStyle?: StyleProp<TextStyle>;
  /** Optional: Custom styles for tab icons */
  iconStyle?: StyleProp<ImageStyle>;
  /** Optional: Custom styles for active tab icons */
  activeIconStyle?: StyleProp<ImageStyle>;
  /** Optional: Active color for icons and text (overrides theme) */
  activeColor?: string;
  /** Optional: Inactive color for icons and text (overrides theme) */
  inactiveColor?: string;
  /** Optional: Callback when a tab is pressed (receives route name) */
  onTabPress?: (route: string) => void;
  /** Optional: Active opacity when pressing tabs (default: 0.8) */
  activeOpacity?: number;
  /** Test ID for testing purposes */
  testID?: string;
  /**
   * Optional: Scale factor for active tab
   * - If true: defaults to 1.3
   * - If number: uses the provided number
   * - If undefined: no scaling (1.0)
   */
  activeScale?: number | boolean;
  /** Optional: Control global label visibility (default: true) */
  showLabel?: boolean;
  /** Optional: Specifically control label visibility for active tab */
  activeShowLabel?: boolean;
  /** Optional: Specifically control label visibility for inactive tabs */
  inactiveShowLabel?: boolean;
}
