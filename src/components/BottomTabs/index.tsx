import React, { memo, useCallback } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styles from './styles';
import { COLORS } from '../../theme';
import { BottomTabsProps, TabItem } from './type';

export type { BottomTabsProps, TabItem };

/**
 * BottomTabs - A customizable bottom navigation component for React Native
 *
 * @example
 * ```tsx
 * import { BottomTabs } from 'react-native-yastools';
 *
 * const tabs = [
 *   { name: 'Home', route: 'Home', icon: require('./icons/home.png') },
 *   { name: 'Search', route: 'Search', icon: require('./icons/search.png') },
 *   { name: 'Profile', route: 'Profile', icon: require('./icons/profile.png') },
 * ];
 *
 * <BottomTabs
 *   navigation={navigation}
 *   currentRoute="Home"
 *   tabs={tabs}
 *   activeColor="#007AFF"
 * />
 * ```
 */
const BottomTabs: React.FC<BottomTabsProps> = ({
  navigation,
  currentRoute,
  tabs,
  containerStyle,
  tabItemStyle,
  activeTabItemStyle,
  textStyle,
  activeTextStyle,
  iconStyle,
  activeIconStyle,
  activeColor,
  inactiveColor,
  onTabPress,
  activeOpacity = 0.8,
  testID,
}) => {
  const handleTabPress = useCallback(
    (tab: TabItem) => {
      if (tab.disabled) return;

      // Call custom callback if provided
      if (onTabPress) {
        onTabPress(tab.route);
      }

      // Navigate to the route
      navigation.navigate(tab.route);
    },
    [navigation, onTabPress]
  );

  const renderTab = useCallback(
    (tab: TabItem, index: number) => {
      const isActive = currentRoute === tab.route;

      // Determine icon tint color
      const iconTintColor = isActive
        ? activeColor || COLORS.primary
        : inactiveColor || COLORS.black;

      // Determine text color
      const textColor = isActive
        ? activeColor || COLORS.primary
        : inactiveColor || COLORS.black;

      // Determine which icon to use
      const iconSource = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;

      // Merge styles based on active state
      const tabStyle = isActive
        ? [styles.navItemActive, tabItemStyle, activeTabItemStyle]
        : [styles.navItem, tabItemStyle];

      const tabTextStyle = isActive
        ? [styles.navTextActive, { color: textColor }, textStyle, activeTextStyle]
        : [styles.navText, { color: textColor }, textStyle];

      const tabIconStyle = isActive
        ? [styles.navIconActive, { tintColor: iconTintColor }, iconStyle, activeIconStyle]
        : [styles.navIcon, { tintColor: iconTintColor }, iconStyle];

      return (
        <TouchableOpacity
          key={`tab-${tab.route}-${index}`}
          style={tabStyle}
          activeOpacity={activeOpacity}
          onPress={() => handleTabPress(tab)}
          disabled={tab.disabled}
          testID={tab.testID || `tab-${tab.route}`}
        >
          <Image
            resizeMode="contain"
            source={iconSource}
            style={tabIconStyle}
          />
          <Text style={tabTextStyle} numberOfLines={1}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [
      currentRoute,
      activeColor,
      inactiveColor,
      tabItemStyle,
      activeTabItemStyle,
      textStyle,
      activeTextStyle,
      iconStyle,
      activeIconStyle,
      activeOpacity,
      handleTabPress,
    ]
  );

  return (
    <View style={[styles.BottomTabsContainer, containerStyle]} testID={testID}>
      {tabs.map(renderTab)}
    </View>
  );
};

export default memo(BottomTabs);
