import {createElement} from 'react';
import type {
  VoiceProps,
  EventProps,
  VoiceOptions,
  ProgressEventProps,
} from '../src/NativeSpeech';
import type {
  HighlightedTextProps,
  HighlightedSegmentArgs,
  HighlightedSegmentProps,
} from '../src/components/types';

class SpeechMock {
  static reset = jest.fn<void, []>();
  static stop = jest.fn<Promise<void>, []>();
  static pause = jest.fn<Promise<boolean>, []>();
  static resume = jest.fn<Promise<boolean>, []>();
  static speak = jest.fn<Promise<void>, [string]>();
  static isSpeaking = jest.fn<Promise<boolean>, []>();
  static initialize = jest.fn<void, [VoiceOptions]>();
  static getAvailableVoices = jest.fn<Promise<VoiceProps[]>, [string?]>();
  static speakWithOptions = jest.fn<Promise<void>, [string, VoiceOptions]>();
  static onError = jest.fn();
  static onStart = jest.fn();
  static onFinish = jest.fn();
  static onPause = jest.fn();
  static onResume = jest.fn();
  static onStopped = jest.fn();
  static onProgress = jest.fn();
}

export const HighlightedText: React.FC<HighlightedTextProps> = props => {
  return createElement('HighlightedText', props, props.text);
};

export default SpeechMock;
export type {
  VoiceProps,
  EventProps,
  VoiceOptions,
  ProgressEventProps,
  HighlightedTextProps,
  HighlightedSegmentArgs,
  HighlightedSegmentProps,
};
