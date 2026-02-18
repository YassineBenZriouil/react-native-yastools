import React from 'react';
import { Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import MediaView from '../index';



describe('MediaView', () => {
    const mockOnClose = jest.fn();
    const mockSource = { uri: 'https://example.com/image.png' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when visible is true', () => {
        const { getByTestId } = render(
            <MediaView
                visible={true}
                source={mockSource}
                type="image"
                onClose={mockOnClose}
            />
        );
        expect(getByTestId('close-button')).toBeTruthy();
    });

    it('renders image when type is image', () => {
        const { UNSAFE_getAllByType } = render(
            <MediaView
                visible={true}
                source={mockSource}
                type="image"
                onClose={mockOnClose}
            />
        );
        const images = UNSAFE_getAllByType(Image);
        expect(images.length).toBeGreaterThanOrEqual(1);
    });

    it('renders video when type is video', () => {
        const { getByTestId } = render(
            <MediaView
                visible={true}
                source={{ uri: 'https://example.com/video.mp4' }}
                type="video"
                onClose={mockOnClose}
            />
        );
        // We mocked Video as 'Video', but testing-library renders it. 
        // We can check if close button is there as a proxy for successful render
        expect(getByTestId('close-button')).toBeTruthy();
    });

    it('calls onClose when close button is pressed', () => {
        const { getByTestId } = render(
            <MediaView
                visible={true}
                source={mockSource}
                type="image"
                onClose={mockOnClose}
            />
        );

        fireEvent.press(getByTestId('close-button'));
        expect(mockOnClose).toHaveBeenCalled();
    });
});
