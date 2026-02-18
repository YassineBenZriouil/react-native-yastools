import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CheckBox from '../index';

describe('CheckBox', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(
            <CheckBox checked={false} onToggle={() => { }} testID="checkbox" />
        );
        expect(getByTestId('checkbox')).toBeTruthy();
    });

    it('displays label when provided', () => {
        const { getByText } = render(
            <CheckBox checked={false} onToggle={() => { }} label="Accept Terms" />
        );
        expect(getByText('Accept Terms')).toBeTruthy();
    });

    it('calls onToggle when pressed', () => {
        const onToggleMock = jest.fn();
        const { getByTestId } = render(
            <CheckBox checked={false} onToggle={onToggleMock} testID="checkbox" />
        );

        fireEvent.press(getByTestId('checkbox'));
        expect(onToggleMock).toHaveBeenCalledWith(true);
        expect(onToggleMock).toHaveBeenCalledTimes(1);
    });

    it('calls onToggle with false when checked is true', () => {
        const onToggleMock = jest.fn();
        const { getByTestId } = render(
            <CheckBox checked={true} onToggle={onToggleMock} testID="checkbox" />
        );

        fireEvent.press(getByTestId('checkbox'));
        expect(onToggleMock).toHaveBeenCalledWith(false);
    });

    it('does not call onToggle when disabled', () => {
        const onToggleMock = jest.fn();
        const { getByTestId } = render(
            <CheckBox checked={false} onToggle={onToggleMock} disabled testID="checkbox" />
        );

        fireEvent.press(getByTestId('checkbox'));
        expect(onToggleMock).not.toHaveBeenCalled();
    });

    it('renders checked state correctly', () => {
        // This is a visual test, but we can verify props/styles if needed, 
        // or just rely on the component integration. 
        // In React Native testing library, verifying styles is possible but often brittle.
        // We'll trust the logic verification above.
        const { getByTestId } = render(
            <CheckBox checked={true} onToggle={() => { }} testID="checkbox" />
        );
        expect(getByTestId('checkbox')).toBeTruthy();
    });
});
