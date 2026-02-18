import { StyleSheet } from 'react-native';
import COLORS, { FONT_SIZES } from '@react-native-yastools/core/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  checkedBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  disabledBox: {
    backgroundColor: COLORS.grayBg,
    borderColor: COLORS.gray,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  label: {
    marginLeft: 10,
    fontSize: FONT_SIZES.f16 || 16,
    color: COLORS.black,
  },
  disabledLabel: {
    color: COLORS.gray,
  },
});

export default styles;


