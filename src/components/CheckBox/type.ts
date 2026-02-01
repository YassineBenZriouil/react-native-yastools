import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface CheckBoxProps {
    /**
     * Whether the checkbox is checked
     */
    checked: boolean;

    /**
     * Callback function called when the checkbox is toggled
     */
    onToggle: (checked: boolean) => void;

    /**
     * Optional label text to display next to the checkbox
     */
    label?: string;

    /**
     * Whether the checkbox is disabled
     */
    disabled?: boolean;

    /**
     * Color of the box when checked (defaults to theme primary)
     */
    activeColor?: string;

    /**
     * Color of the box when unchecked (defaults to theme lightGray or border color)
     */
    inactiveColor?: string;

    /**
     * Color of the checkmark icon (defaults to white)
     */
    checkColor?: string;

    /**
     * Additional style for the container
     */
    containerStyle?: StyleProp<ViewStyle>;

    /**
     * Additional style for the label text
     */
    labelStyle?: StyleProp<TextStyle>;

    /**
     * Additional style for the checkbox square
     */
    boxStyle?: StyleProp<ViewStyle>;

    /**
     * Test ID for testing
     */
    testID?: string;
}
