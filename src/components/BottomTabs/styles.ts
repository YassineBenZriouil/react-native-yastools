import { StyleSheet, Platform } from 'react-native';
import COLORS, { FONT_SIZES, FONT_FAMILY } from '../../theme';

/**
 * Default styles for the BottomTabs component
 * Uses standard React Native StyleSheet for maximum compatibility
 */
export default StyleSheet.create({
    BottomTabsContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    navItem: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 8,
    },
    navItemActive: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 8,
    },
    navText: {
        fontFamily: FONT_FAMILY.InterRegular,
        fontSize: FONT_SIZES.f11,
        marginTop: 5,
    },
    navTextActive: {
        fontFamily: FONT_FAMILY.InterRegular,
        fontSize: FONT_SIZES.f11,
        marginTop: 5,
    },
    navIcon: {
        width: 20,
        height: 20,
    },
    navIconActive: {
        width: 20,
        height: 20,
    },
});
