import React, { memo, useCallback, useRef, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text, Animated } from 'react-native';
import styles from './styles';
import { COLORS } from '@react-native-yastools/core/theme';
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

const TabItemComponent = memo(({
  tab,
  isActive,
  onPress,
  activeColor,
  inactiveColor,
  activeScale,
  activeOpacity,
  index,
  tabItemStyle,
  activeTabItemStyle,
  textStyle,
  activeTextStyle,
  iconStyle,
  activeIconStyle,
  showLabel,
  activeShowLabel,
  inactiveShowLabel,
}: any) => {
  const animatedValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const activeColorVal = activeColor || COLORS.primary;
  const inactiveColorVal = inactiveColor || COLORS.black;

  const iconColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColorVal, activeColorVal],
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColorVal, activeColorVal],
  });

  // Determine target scale
  let targetScale = 1;

  if (typeof activeScale === 'number') {
    targetScale = activeScale;
  } else if (activeScale === true || (activeScale === undefined && typeof activeScale !== 'boolean')) {
    targetScale = activeScale === true ? 1.3 : (typeof activeScale === 'number' ? activeScale : 1);
  }

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, targetScale],
  });

  const tabStyle = isActive
    ? [styles.navItemActive, tabItemStyle, activeTabItemStyle]
    : [styles.navItem, tabItemStyle];

  const iconSource = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;

  // Determine label visibility
  // Precedence: explicit active/inactive prop > global showLabel > default (true)
  const shouldShowLabel = isActive
    ? (activeShowLabel ?? showLabel ?? true)
    : (inactiveShowLabel ?? showLabel ?? true);

  return (
    <TouchableOpacity
      key={`tab-${tab.route}-${index}`}
      style={tabStyle}
      activeOpacity={activeOpacity}
      onPress={() => onPress(tab)}
      disabled={tab.disabled}
      testID={tab.testID || `tab-${tab.route}`}
    >
      <Animated.Image
        resizeMode="contain"
        source={iconSource}
        style={[
          styles.navIcon,
          isActive && styles.navIconActive,
          { tintColor: iconColor, transform: [{ scale }] },
          iconStyle,
          isActive && activeIconStyle,
        ]}
      />
      {shouldShowLabel && (
        <Animated.Text
          style={[
            styles.navText,
            isActive && styles.navTextActive,
            { color: textColor, transform: [{ scale }] },
            textStyle,
            isActive && activeTextStyle,
          ]}
          numberOfLines={1}
        >
          {tab.name}
        </Animated.Text>
      )}
    </TouchableOpacity>
  );
});

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
  activeScale,
  showLabel,
  activeShowLabel,
  inactiveShowLabel,
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

  return (
    <View style={[styles.BottomTabsContainer, containerStyle]} testID={testID}>
      {tabs.map((tab, index) => (
        <TabItemComponent
          key={tab.route}
          tab={tab}
          index={index}
          isActive={currentRoute === tab.route}
          onPress={handleTabPress}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          activeScale={activeScale}
          activeOpacity={activeOpacity}
          tabItemStyle={tabItemStyle}
          activeTabItemStyle={activeTabItemStyle}
          textStyle={textStyle}
          activeTextStyle={activeTextStyle}
          iconStyle={iconStyle}
          activeIconStyle={activeIconStyle}
          showLabel={showLabel}
          activeShowLabel={activeShowLabel}
          inactiveShowLabel={inactiveShowLabel}
        />
      ))}
    </View>
  );
};

export default memo(BottomTabs);
