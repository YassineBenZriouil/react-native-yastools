import { ToastAndroid, Alert, Platform, Animated } from 'react-native';
import { useRef, useCallback } from 'react';

export const displayToast = (msg: string) => {
    const message =
        typeof msg === 'string' && msg?.trim().length > 0
            ? msg
            : 'Something went wrong';

    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    } else {
        Alert.alert('', message, [{ text: 'OK' }]);
    }
};

export function preventMultiPress(onPress: () => void, delay: number = 500) {
    var lastPress = 0;
    return () => {
        const now = Date.now();
        if (now - lastPress < delay) return;

        lastPress = now;
        onPress();
    };
}

export function usePressScale(scaleValue: number = 0.95) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback(() => {
        Animated.spring(scaleAnim, {
            toValue: scaleValue,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    }, [scaleAnim, scaleValue]);

    const handlePressOut = useCallback(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    }, [scaleAnim]);

    return {
        scaleAnim,
        handlePressIn,
        handlePressOut,
    };
}
