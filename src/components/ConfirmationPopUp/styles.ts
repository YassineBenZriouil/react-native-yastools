import { StyleSheet } from 'react-native';
import COLORS, { FONT_FAMILY, FONT_SIZES } from '../../theme';

const styleSheet = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
        alignItems: 'center',
        width: '90%',
        maxWidth: 340,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonImage: {
        width: 16,
        height: 16,
        tintColor: COLORS.gray,
    },
    title: {
        fontSize: FONT_SIZES.f20,
        fontFamily: FONT_FAMILY.InterBold,
        color: COLORS.primary,
        marginTop: 10,
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: FONT_SIZES.f14,
        fontFamily: FONT_FAMILY.InterRegular,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        width: '100%',
    },
    cancelButton: {
        width: 110,
        height: 40,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    cancelButtonText: {
        fontSize: FONT_SIZES.f14,
        fontFamily: FONT_FAMILY.InterSemiBold,
        color: COLORS.primary,
    },
    confirmButton: {
        width: 110,
        height: 40,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    confirmButtonText: {
        fontSize: FONT_SIZES.f14,
        fontFamily: FONT_FAMILY.InterSemiBold,
        color: COLORS.white,
    },
});

export default styleSheet;
