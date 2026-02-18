import React, { memo } from 'react';
import { TouchableOpacity, Image, View, Text, ViewStyle } from 'react-native';
import styles from './styles';
import CheckIcon from '@react-native-yastools/core/assets/imgs/whiteCheck.png';
import COLORS from '@react-native-yastools/core/theme';
import { CheckBoxProps } from './type';

/**
 * CheckBox - A customizable checkbox component
 */
const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  onToggle,
  label,
  disabled = false,
  activeColor = COLORS.primary,
  inactiveColor = COLORS.gray,
  checkColor,
  containerStyle,
  labelStyle,
  boxStyle,
  testID,
}) => {
  const handlePress = () => {
    if (!disabled && onToggle) {
      onToggle(!checked);
    }
  };

  const boxStyles: ViewStyle[] = [
    styles.box,
    !checked ? { borderColor: inactiveColor } : undefined,
    checked ? styles.checkedBox : undefined,
    checked ? { backgroundColor: activeColor, borderColor: activeColor } : undefined,
    disabled ? styles.disabledBox : undefined,
    boxStyle as ViewStyle,
  ];

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
      testID={testID}
    >
      <View style={boxStyles}>
        {checked && (
          <Image
            source={CheckIcon}
            style={[styles.icon, checkColor ? { tintColor: checkColor } : undefined]}
          />
        )}
      </View>
      {label && (
        <Text style={[styles.label, disabled && styles.disabledLabel, labelStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(CheckBox);
