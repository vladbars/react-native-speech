import TurboSpeech from './NativeSpeech';
import type {VoiceOptions, VoiceProps} from './NativeSpeech';

export type {VoiceProps, VoiceOptions};

export default class Speech {
  /**
   * Gets a list of all available voices on the device
   * @param language - Optional language code to filter voices (e.g., 'en', 'en-US', 'fr-FR').
   *                  If not provided, returns all available voices.
   * @returns Promise<VoiceProps[]> Array of voice properties matching the language filter
   * @example
   * // Get all available voices
   * const allVoices = await Speech.getAvailableVoices();
   * // Get only English voices
   * const englishVoices = await Speech.getAvailableVoices('en-US');
   * // or
   * const englishVoices = await Speech.getAvailableVoices('en');
   */
  public static getAvailableVoices(language?: string): Promise<VoiceProps[]> {
    return TurboSpeech.getAvailableVoices(language ?? '');
  }

  /**
   * Sets the global options for all subsequent speak() calls
   * @param options - Voice configuration options
   * @property {number} options.pitch - Voice pitch (0.5 to 2.0)
   * @property {number} options.rate - Speech rate (0.0 to 1.0)
   * @property {number} options.volume - Voice volume (0.0 to 1.0)
   * @property {string} options.language - Voice language code
   * @property {string} options.voice - Specific voice identifier
   * @example
   * Speech.initialize({
   *   pitch: 1.2,
   *   rate: 0.8,
   *   volume: 1.0,
   *   language: 'en-US'
   * });
   */
  public static initialize(options: VoiceOptions): void {
    TurboSpeech.initialize(options);
  }

  /**
   * Resets all speech options to their default values
   * @example
   * Speech.reset();
   */
  public static reset(): void {
    TurboSpeech.reset();
  }

  /**
   * Immediately stops any ongoing speech synthesis
   * @returns Promise<void> Resolves when speech is stopped
   * @example
   * await Speech.stop();
   */
  public static stop(): Promise<void> {
    return TurboSpeech.stop();
  }

  /**
   * Pauses the current speech at the next word boundary
   * @returns Promise<boolean> Resolves to true if speech was paused, false if nothing to pause
   * @example
   * const isPaused = await Speech.pause();
   * console.log(isPaused ? 'Speech paused' : 'Nothing to pause');
   */
  public static pause(): Promise<boolean> {
    return TurboSpeech.pause();
  }

  /**
   * Resumes previously paused speech
   * @returns Promise<boolean> Resolves to true if speech was resumed, false if nothing to resume
   * @example
   * const isResumed = await Speech.resume();
   * console.log(isResumed ? 'Speech resumed' : 'Nothing to resume');
   */
  public static resume(): Promise<boolean> {
    return TurboSpeech.resume();
  }

  /**
   * Speaks text using current global options
   * @param text - The text to synthesize
   * @returns Promise<void> Resolves when speech completes
   * @throws If text is null or empty
   * @example
   * await Speech.speak('Hello, world!');
   */
  public static isSpeaking(): Promise<boolean> {
    return TurboSpeech.isSpeaking();
  }

  /**
   * Speaks text using current global options
   * @param text - The text to synthesize
   * @returns Promise<void> Resolves when speech completes
   * @example
   * await Speech.speak('Hello, world!');
   */
  public static speak(text: string): Promise<void> {
    return TurboSpeech.speak(text);
  }

  /**
   * Speaks text with custom options for this utterance only, for each one of the options that aren't provided, it will use the global one
   * @param text - The text to synthesize
   * @param options - Voice options overriding global settings
   * @returns Promise<void> Resolves when speech completes
   * @example
   * await Speech.speakWithOptions('Hello!', {
   *   pitch: 1.5,
   *   rate: 0.8,
   *   language: 'en-US'
   * });
   */
  public static speakWithOptions(
    text: string,
    options: VoiceOptions,
  ): Promise<void> {
    return TurboSpeech.speakWithOptions(text, options);
  }

  /**
   * Called when speech synthesis begins
   * @example
   * // Add listener
   * const subscription = Speech.onStart(() => console.log('Started speaking'));
   * // Later, cleanup when no longer needed
   * subscription.remove();
   */
  public static onStart = TurboSpeech.onStart;
  /**
   * Called when speech synthesis completes normally
   * @example
   * const subscription = Speech.onFinish(() => console.log('Finished speaking'));
   * // Cleanup
   * subscription.remove();
   */
  public static onFinish = TurboSpeech.onFinish;
  /**
   * Called when speech is paused
   * @example
   * const subscription = Speech.onPause(() => console.log('Speech paused'));
   * // Cleanup
   * subscription.remove();
   */
  public static onPause = TurboSpeech.onPause;
  /**
   * Called when speech is resumed
   * @example
   * const subscription = Speech.onResume(() => console.log('Speech resumed'));
   * // Cleanup
   * subscription.remove();
   */
  public static onResume = TurboSpeech.onResume;
  /**
   * Called when speech is stopped
   * @example
   * const subscription = Speech.onStopped(() => console.log('Speech stopped'));
   * // Cleanup
   * subscription.remove();
   */
  public static onStopped = TurboSpeech.onStopped;
  /**
   * Called during speech with progress information
   * @param callback Progress data containing current position
   * @property {number} data.id - Unique identifier for the utterance
   * @property {number} data.length - Total length of the current word
   * @property {number} data.location - Current speaking position
   * @example
   * const subscription = Speech.onProgress(({ id, length, location }) => {
   *   const progress = Math.round((location / length) * 100);
   *   console.log(`Speaking progress: ${progress}%`);
   * });
   * // Cleanup when component unmounts or listener is no longer needed
   * subscription.remove();
   */
  public static onProgress = TurboSpeech.onProgress;
}
