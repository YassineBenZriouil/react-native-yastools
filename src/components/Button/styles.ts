import { StyleSheet } from 'react-native';
import COLORS, { FONT_SIZES } from '../../theme';

/**
 * Default styles for the YasButton component
 * Uses standard React Native StyleSheet for maximum compatibility
 */
export default StyleSheet.create({
  container: {
    width: 176,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    gap: 20,
  },
  disabled: {
    width: 176,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.grayBg,
    flexDirection: 'row',
    gap: 20,
  },
  text: {
    fontSize: FONT_SIZES.f16,
    color: COLORS.white,
    fontWeight: '600',
  },
  icon: {
    width: 24,
    height: 26,
  },
});
