// Components
export { default as Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { default as BottomTabs } from './components/BottomTabs';
export type { BottomTabsProps, TabItem } from './components/BottomTabs';

// Theme utilities (for customization)
export { default as COLORS, FONT_FAMILY, FONT_SIZES } from './theme';

// Legacy exports (deprecated - use Button instead)
export { default as YasButton } from './components/Button';
export type { ButtonProps as YasButtonProps } from './components/Button';

// Re-export Button as default for convenience
export { default } from './components/Button';
