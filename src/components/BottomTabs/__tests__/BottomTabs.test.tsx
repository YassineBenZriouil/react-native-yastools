import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BottomTabs from '../index';
import { TabItem } from '../type';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

// Sample tabs for testing
const sampleTabs: TabItem[] = [
  { name: 'Home', route: 'Home', icon: { uri: 'https://example.com/home.png' } },
  { name: 'Search', route: 'Search', icon: { uri: 'https://example.com/search.png' } },
  { name: 'Profile', route: 'Profile', icon: { uri: 'https://example.com/profile.png' } },
];

describe('BottomTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tabs correctly', () => {
    const { getByText } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={sampleTabs}
      />
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('navigates to correct route when tab is pressed', () => {
    const { getByText } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={sampleTabs}
      />
    );

    fireEvent.press(getByText('Search'));
    expect(mockNavigate).toHaveBeenCalledWith('Search');
  });

  it('calls onTabPress callback when provided', () => {
    const onTabPressMock = jest.fn();
    const { getByText } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={sampleTabs}
        onTabPress={onTabPressMock}
      />
    );

    fireEvent.press(getByText('Profile'));
    expect(onTabPressMock).toHaveBeenCalledWith('Profile');
    expect(mockNavigate).toHaveBeenCalledWith('Profile');
  });

  it('does not navigate when tab is disabled', () => {
    const disabledTabs: TabItem[] = [
      { name: 'Home', route: 'Home', icon: { uri: 'https://example.com/home.png' } },
      { name: 'Search', route: 'Search', icon: { uri: 'https://example.com/search.png' }, disabled: true },
    ];

    const { getByText } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={disabledTabs}
      />
    );

    fireEvent.press(getByText('Search'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('applies custom testID to tabs', () => {
    const tabsWithTestId: TabItem[] = [
      { name: 'Home', route: 'Home', icon: { uri: 'https://example.com/home.png' }, testID: 'home-tab' },
    ];

    const { getByTestId } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={tabsWithTestId}
      />
    );

    expect(getByTestId('home-tab')).toBeTruthy();
  });

  it('renders with container testID', () => {
    const { getByTestId } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={sampleTabs}
        testID="bottom-tabs"
      />
    );

    expect(getByTestId('bottom-tabs')).toBeTruthy();
  });

  it('renders empty when no tabs are provided', () => {
    const { queryByText } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={[]}
      />
    );

    expect(queryByText('Home')).toBeNull();
  });

  it('handles single tab correctly', () => {
    const singleTab: TabItem[] = [
      { name: 'Home', route: 'Home', icon: { uri: 'https://example.com/home.png' } },
    ];

    const { getByText, queryByText } = render(
      <BottomTabs
        navigation={mockNavigation}
        currentRoute="Home"
        tabs={singleTab}
      />
    );

    expect(getByText('Home')).toBeTruthy();
    expect(queryByText('Search')).toBeNull();
  });
});
