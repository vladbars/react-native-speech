import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { EventEmitter } from 'react-native/Libraries/Types/CodegenTypes';

export type VocieQuality = 'Default' | 'Enhanced';

export interface EventProps {
  /**
   * The utterance ID
   */
  id: number;
}
export interface ProgressEventProps extends EventProps {
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
  /** The quality level of the voice */
  quality: VocieQuality;
  /** The language code of the voice (e.g., 'en-US', 'fr-FR') */
  language: string;
  /** The unique identifier for the voice */
  identifier: string;
}
export interface VoiceOptions {
  /** The language code to use (e.g., 'en', 'fr', 'en-US', 'fr-FR') */
  language?: string;
  /** Volume level from 0.0 to 1.0 */
  volume?: number;
  /** Specific voice identifier to use */
  voice?: string;
  /**
   * Pitch multiplier from 0.5 to 2.0
   * - `Android`: (0.1 - 2.0)
   * - `iOS`: (0.5 - 2.0)
   */
  pitch?: number;
  /**
   * Speech rate
   * - `Android`: (0.1 - 2.0)
   * - `iOS`: (`AVSpeechUtteranceMinimumSpeechRate` - `AVSpeechUtteranceMaximumSpeechRate`)
   */
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

  readonly onError: EventEmitter<EventProps>;
  readonly onStart: EventEmitter<EventProps>;
  readonly onFinish: EventEmitter<EventProps>;
  readonly onPause: EventEmitter<EventProps>;
  readonly onResume: EventEmitter<EventProps>;
  readonly onStopped: EventEmitter<EventProps>;
  readonly onProgress: EventEmitter<ProgressEventProps>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SpeechTts');
