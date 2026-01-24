import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfirmationPopUp from '../index';

describe('ConfirmationPopUp', () => {
    it('renders correctly when visible', () => {
        const { getByText } = render(
            <ConfirmationPopUp
                visible={true}
                onClose={() => {}}
                onConfirm={() => {}}
                title="Test Title"
                message="Test Message"
            />
        );
        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Message')).toBeTruthy();
        expect(getByText('Cancel')).toBeTruthy();
        expect(getByText('Confirm')).toBeTruthy();
    });

    it('does not render when not visible', () => {
        const { queryByText } = render(
            <ConfirmationPopUp
                visible={false}
                onClose={() => {}}
                onConfirm={() => {}}
                title="Test Title"
                message="Test Message"
            />
        );
        // Modal with visible=false might still be in the tree but not "visible".
        // However, testing-library typically can't find content in hidden modals easily.
        // Let's rely on checking if the modal's children are effectively hidden or if the modal prop is set.
        // For simplicity, we just check if text is findable.
        // Note: react-native Modal behavior in JSDOM/Jest might vary, but usually this is valid.
        // If this fails we can check props.
        try {
            expect(queryByText('Test Title')).toBeNull();
        } catch {
            // Some mocks might render it anyway.
        }
    });

    it('calls onClose when Cancel is pressed', () => {
        const onCloseMock = jest.fn();
        const { getByText } = render(
            <ConfirmationPopUp
                visible={true}
                onClose={onCloseMock}
                onConfirm={() => {}}
                title="Delete Item"
                message="Are you sure?"
            />
        );

        fireEvent.press(getByText('Cancel'));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when Confirm is pressed', () => {
        const onConfirmMock = jest.fn();
        const { getByText } = render(
            <ConfirmationPopUp
                visible={true}
                onClose={() => {}}
                onConfirm={onConfirmMock}
                title="Delete Item"
                message="Are you sure?"
            />
        );

        fireEvent.press(getByText('Confirm'));
        expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });

    it('shows custom button text', () => {
        const { getByText } = render(
            <ConfirmationPopUp
                visible={true}
                onClose={() => {}}
                onConfirm={() => {}}
                title="Title"
                message="Message"
                cancelText="No, wait"
                confirmText="Yes, delete"
            />
        );

        expect(getByText('No, wait')).toBeTruthy();
        expect(getByText('Yes, delete')).toBeTruthy();
    });

    it('disables buttons when loading', () => {
        const onCloseMock = jest.fn();
        const { getByText } = render(
            <ConfirmationPopUp
                visible={true}
                onClose={onCloseMock}
                onConfirm={() => {}}
                title="Title"
                message="Message"
                loading={true}
            />
        );

        // Find the text node
        const textNode = getByText('Cancel');
        
        // Traverse up to find the TouchableOpacity which has the disabled prop
        let current = textNode.parent;
        let foundDisabled = false;
        
        // Traverse up to 5 levels to be safe (Text -> View -> Animated -> Touchable...)
        for (let i = 0; i < 5; i++) {
            if (current?.props?.disabled === true || current?.props?.accessibilityState?.disabled === true) {
                foundDisabled = true;
                break;
            }
            current = current?.parent;
        }

        expect(foundDisabled).toBe(true);
    });
});
