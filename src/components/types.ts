import {StyleProp, type TextStyle, type TextProps} from 'react-native';

/**
 * Arguments passed when a highlighted text segment is pressed
 * It includes required `start`, `end`, and `text` properties
 */
export type HighlightedSegmentArgs = Required<
  Omit<TextSegmentProps, 'style' | 'isHighlighted'>
>;

/**
 * Represents a segment of text that should be highlighted
 * - `start` and `end` define the range of the text to be highlighted
 * - `style` allows custom styling for the highlighted segment
 */
export interface HighlightedSegmentProps {
  start: number;
  end: number;
  style?: StyleProp<TextStyle>;
}
export interface TextSegmentProps extends Partial<HighlightedSegmentProps> {
  text: string;
  isHighlighted: boolean;
}
/**
 * Props for the `HighlightedText` component
 * - `text`: The full text content to be displayed
 * - `highlightedStyle`: Custom styles for highlighted text
 * - `highlights`: An array of segments that should be highlighted
 * - `onHighlightedPress`: Callback triggered when a highlighted segment is pressed
 */
export interface HighlightedTextProps extends TextProps {
  text: string;
  highlightedStyle?: StyleProp<TextStyle>;
  highlights?: Array<HighlightedSegmentProps>;
  onHighlightedPress?: (segment: HighlightedSegmentArgs) => void;
}
