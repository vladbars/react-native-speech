import type {
  EventProps,
  VoiceProps,
  VoiceOptions,
  ProgressEventProps,
} from './NativeSpeech';
import TurboSpeech from './NativeSpeech';

export type {VoiceProps, VoiceOptions, EventProps, ProgressEventProps};
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
   * @platform iOS
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
   * @platform iOS
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
   * Called when speech is errored
   * @platform Android
   * @example
   * // Add listener
   * const subscription = Speech.onError(({id}) => console.log('Failed speaking', id));
   * // Later, cleanup when no longer needed
   * subscription.remove();
   */
  public static onError = TurboSpeech.onError;
  /**
   * Called when speech synthesis begins
   * @example
   * // Add listener
   * const subscription = Speech.onStart(({id}) => console.log('Started speaking', id));
   * // Later, cleanup when no longer needed
   * subscription.remove();
   */
  public static onStart = TurboSpeech.onStart;
  /**
   * Called when speech synthesis completes normally
   * @example
   * const subscription = Speech.onFinish(({id}) => console.log('Finished speaking', id));
   * // Cleanup
   * subscription.remove();
   */
  public static onFinish = TurboSpeech.onFinish;
  /**
   * Called when speech is paused
   * @platform iOS
   * @example
   * const subscription = Speech.onPause(({id}) => console.log('Speech paused', id));
   * // Cleanup
   * subscription.remove();
   */
  public static onPause = TurboSpeech.onPause;
  /**
   * Called when speech is resumed
   * @platform iOS
   * @example
   * const subscription = Speech.onResume(({id}) => console.log('Speech resumed', id));
   * // Cleanup
   * subscription.remove();
   */
  public static onResume = TurboSpeech.onResume;
  /**
   * Called when speech is stopped
   * @example
   * const subscription = Speech.onStopped(({id}) => console.log('Speech stopped', id));
   * // Cleanup
   * subscription.remove();
   */
  public static onStopped = TurboSpeech.onStopped;
  /**
   * Called during speech with progress information
   * @param callback Progress data containing current position
   * @example
   * const subscription = Speech.onProgress(progress => {
   *   console.log(`Speaking progress`, progress);
   * });
   * // Cleanup when component unmounts or listener is no longer needed
   * subscription.remove();
   */
  public static onProgress = TurboSpeech.onProgress;
}
