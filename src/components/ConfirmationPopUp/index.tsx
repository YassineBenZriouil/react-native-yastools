import React, { memo } from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Image,
} from 'react-native';
import styles from './styles';
import Button from '../Button';
import closeIcon from '../../assets/imgs/close.png';

export interface ConfirmationPopUpProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
    showCloseButton?: boolean;
    loading?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
}

/**
 * Global confirmation popup component
 * Reusable across the app for any confirmation dialogs
 */
const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({
    visible,
    onClose,
    onConfirm,
    title,
    message,
    cancelText,
    confirmText,
    showCloseButton = true,
    loading = false,
    animationType = 'fade',
}) => {
    // Use translations for default values
    const finalCancelText = cancelText || 'Cancel';
    const finalConfirmText = confirmText || 'Confirm';

    return (
        <Modal
            visible={visible}
            transparent
            animationType={animationType}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={loading ? undefined : onClose} disabled={loading}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            {/* Close button */}
                            {showCloseButton && (
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={loading ? undefined : onClose}
                                    disabled={loading}
                                >
                                    <Image
                                        source={closeIcon}
                                        style={styles.closeButtonImage}
                                    />
                                </TouchableOpacity>
                            )}

                            {/* Title */}
                            <Text style={styles.title}>{title}</Text>

                            {/* Message */}
                            <Text style={styles.message}>{message}</Text>

                            {/* Buttons */}
                            <View style={styles.buttonsContainer}>
                                <Button
                                    additionalStyle={styles.cancelButton}
                                    textStyle={styles.cancelButtonText}
                                    text={finalCancelText}
                                    onPress={onClose}
                                    disabled={loading}
                                />
                                <Button
                                    text={finalConfirmText}
                                    onPress={onConfirm}
                                    additionalStyle={styles.confirmButton}
                                    textStyle={styles.confirmButtonText}
                                    fetching={loading}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default memo(ConfirmationPopUp);
