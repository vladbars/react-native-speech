import {StyleProp, type TextStyle, type TextProps} from 'react-native';

export type HighlightedSegmentArgs = Required<
  Omit<TextSegmentProps, 'style' | 'isHighlighted'>
>;

export interface HighlightedSegmentProps {
  start: number;
  end: number;
  style?: StyleProp<TextStyle>;
}

export interface TextSegmentProps extends Partial<HighlightedSegmentProps> {
  text: string;
  isHighlighted: boolean;
}

export interface HighlightedTextProps extends TextProps {
  text: string;
  highlightedStyle?: StyleProp<TextStyle>;
  highlights?: Array<HighlightedSegmentProps>;
  onHighlightedPress?: (segment: HighlightedSegmentArgs) => void;
}
