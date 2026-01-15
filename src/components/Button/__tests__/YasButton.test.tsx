import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import YasButton from '../index';

describe('YasButton', () => {
  it('renders correctly with text', () => {
    const { getByText } = render(
      <YasButton text="Press Me" onPress={() => {}} />
    );
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <YasButton text="Press Me" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <YasButton text="Press Me" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows loading indicator when fetching', () => {
    const { queryByText, getByTestId } = render(
      <YasButton text="Press Me" onPress={() => {}} fetching testID="button" />
    );

    expect(queryByText('Press Me')).toBeNull();
  });

  it('debounces multiple rapid presses', () => {
    jest.useFakeTimers();
    const onPressMock = jest.fn();
    const { getByText } = render(
      <YasButton text="Press Me" onPress={onPressMock} debounceTime={1000} />
    );

    const button = getByText('Press Me');

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  it('applies custom primary color', () => {
    const { getByTestId } = render(
      <YasButton
        text="Press Me"
        onPress={() => {}}
        primaryColor="#FF0000"
        testID="custom-button"
      />
    );

    const button = getByTestId('custom-button');
    const flattenedStyle = Array.isArray(button.props.style)
      ? button.props.style.flat().reduce((acc: object, style: object) => ({ ...acc, ...style }), {})
      : button.props.style;
    expect(flattenedStyle.backgroundColor).toBe('#FF0000');
  });

  it('renders without text when only icon is provided', () => {
    const mockIcon = { uri: 'https://example.com/icon.png' };
    const { queryByText } = render(
      <YasButton onPress={() => {}} icon={mockIcon} />
    );

    expect(queryByText('Press Me')).toBeNull();
  });
});
