import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';
import type {EventEmitter} from 'react-native/Libraries/Types/CodegenTypes';

export interface ProgressProps {
  /**
   * The utterance ID
   */
  id: number;
  /**
   * The text being spoken length
   */
  length: number;
  /**
   * The current position in the spoken text
   */
  location: number;
}
export interface VoiceProps {
  /** The name of the voice */
  name: string;
  /** The quality level of the voice (0: Default, 1: Enhanced) */
  quality: number;
  /** The language code of the voice (e.g., 'en-US', 'fr-FR') */
  language: string;
  /** The unique identifier for the voice */
  identifier: string;
}
export interface VoiceOptions {
  /** The language code to use (e.g., 'en-US', 'fr-FR') */
  language?: string;
  /** Volume level from 0.0 to 1.0 */
  volume?: number;
  /** Specific voice identifier to use */
  voice?: string;
  /** Pitch multiplier from 0.5 to 2.0 */
  pitch?: number;
  /** Speech rate (0.0 - 1.0) */
  rate?: number;
}

export interface Spec extends TurboModule {
  reset: () => void;
  stop: () => Promise<void>;
  pause: () => Promise<boolean>;
  resume: () => Promise<boolean>;
  isSpeaking: () => Promise<boolean>;
  speak: (text: string) => Promise<void>;
  initialize: (options: VoiceOptions) => void;
  getAvailableVoices: (language: string) => Promise<VoiceProps[]>;
  speakWithOptions: (text: string, options: VoiceOptions) => Promise<void>;

  readonly onStart: EventEmitter<void>;
  readonly onFinish: EventEmitter<void>;
  readonly onPause: EventEmitter<void>;
  readonly onResume: EventEmitter<void>;
  readonly onStopped: EventEmitter<void>;
  readonly onProgress: EventEmitter<ProgressProps>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Speech');
