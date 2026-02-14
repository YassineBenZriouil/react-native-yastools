import React from 'react';
import {
    View,
    Modal,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    ImageStyle,
    Pressable,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import styles from './styles';

interface MediaViewProps {
    visible: boolean;
    source: ImageSourcePropType;
    type: 'image' | 'video';
    onClose: () => void;
    closeIcon?: ImageSourcePropType;
    closeButtonStyle?: StyleProp<ViewStyle>;
    closeIconStyle?: StyleProp<ImageStyle>;
    zoomableImage?: boolean;
    videoControls?: boolean;
    animationType?: 'fade' | 'slide' | 'none';
    exitOnBackDropClick?: boolean;
}


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MediaView: React.FC<MediaViewProps> = ({
    visible,
    source,
    type,
    onClose,
    closeIcon,
    closeButtonStyle,
    closeIconStyle,
    zoomableImage = false,
    exitOnBackDropClick = false,
    animationType = 'fade',
}) => {
    const videoRef = React.useRef<any>(null);

    return (
        <Modal
            visible={visible}
            transparent
            animationType={animationType}
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.container}>
                {/* Backdrop handler */}
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => exitOnBackDropClick && onClose()}
                />

                {/* Close button - Absolute to stay on top */}
                <TouchableOpacity
                    testID="close-button"
                    style={[
                        styles.closeButton,
                        { position: 'absolute', top: 50, right: 20 },
                        closeButtonStyle,
                    ]}
                    onPress={onClose}
                    activeOpacity={0.7}
                >
                    <Image
                        source={closeIcon || require('../../assets/imgs/close.png')}
                        style={[styles.closeIcon, closeIconStyle]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Content */}
                <View pointerEvents="box-none" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {type === 'video' ? (
                        <Video
                            ref={videoRef}
                            source={source as any}
                            style={styles.image}
                            controls={true}
                            resizeMode="contain"
                            paused={!visible}
                        />
                    ) : zoomableImage ? (
                        <ReactNativeZoomableView
                            maxZoom={30}
                            minZoom={0.5}
                            zoomStep={0.5}
                            initialZoom={1}
                            bindToBorders={true}
                            captureEvent={true}
                            style={{
                                width: SCREEN_WIDTH,
                                height: SCREEN_HEIGHT,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={source}
                                style={[styles.image, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.8 }]}
                                resizeMode="contain"
                            />
                        </ReactNativeZoomableView>
                    ) : (
                        <Image
                            source={source}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default MediaView;
