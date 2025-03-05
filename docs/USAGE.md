# React Native Speech Usage Guide

- [React Native Speech Usage Guide](#react-native-speech-usage-guide)
  - [Installation](#installation)
    - [Bare React Native](#bare-react-native)
    - [Expo](#expo)
  - [API Overview](#api-overview)
    - [Getting Available Voices](#getting-available-voices)
    - [Initializing Global Speech Options](#initializing-global-speech-options)
    - [Resetting Speech Options](#resetting-speech-options)
    - [Speaking Text](#speaking-text)
    - [Speaking Text with Custom Options](#speaking-text-with-custom-options)
    - [Controlling Speech](#controlling-speech)
      - [**Stop Speech**](#stop-speech)
      - [**Pause Speech**](#pause-speech)
      - [**Resume Speech**](#resume-speech)
      - [**Check if Speaking**](#check-if-speaking)
    - [Event Callbacks](#event-callbacks)
      - [**onError**](#onerror)
      - [**onStart**](#onstart)
      - [**onFinish**](#onfinish)
      - [**onPause**](#onpause)
      - [**onResume**](#onresume)
      - [**onStopped**](#onstopped)
      - [**onProgress**](#onprogress)
  - [Example Application](#example-application)

---

## Installation

### Bare React Native

Install the package using either npm or Yarn:

```sh
npm install @mhpdev/react-native-speech
```

Or with Yarn:

```sh
yarn add @mhpdev/react-native-speech
```

### Expo

For Expo projects, follow these steps:

1. Install the package:

   ```sh
   npx expo install @mhpdev/react-native-speech
   ```

2. Since it is not supported on Expo Go, run:

   ```sh
   npx expo prebuild
   ```

---

## API Overview

The library exports a `Speech` class that provides methods for speech synthesis and event handling:

```tsx
import Speech from '@mhpdev/react-native-speech';
```

---

### Getting Available Voices

Retrieve a list of all available voices on the device. Optionally, you can filter voices by providing a language code or tag ([IETF BCP 47 language tag](https://www.techonthenet.com/js/language_tags.php)).

**API Definition:**

```ts
Speech.getAvailableVoices(language?: string): Promise<VoiceProps[]>
```

**VoiceProps:**

- `name`: The name of the voice.
- `identifier`: The unique identifier for the voice.
- `language`: The language tag (e.g., `'en-US'`, `'fr-FR'`).
- `quality`: The quality level of the voice (`'Default'` or `'Enhanced'`).

**Example Usage:**

```ts
// Retrieve all voices
Speech.getAvailableVoices().then(voices => {
  console.log('Available voices:', voices);
});

// Retrieve only English voices
Speech.getAvailableVoices('en').then(voices => {
  console.log('English voices:', voices);
});

// Retrieve only English (US) voices
Speech.getAvailableVoices('en-US').then(voices => {
  console.log('English (US) voices:', voices);
});
```

---

### Initializing Global Speech Options

Set global speech options that apply to all speech synthesis calls.

**API Definition:**

```ts
Speech.initialize(options: VoiceOptions): void
```

**VoiceOptions Properties:**

- `language`: Language code or IETF BCP 47 language tag (e.g., `'en-US'`, `'fr-FR'`).
- `volume`: Volume level (from `0.0` to `1.0`).
- `voice`: Specific voice identifier to use.
- `pitch`: Pitch multiplier (Android: `0.1`–`2.0`; iOS: `0.5`–`2.0`).
- `rate`: Speech rate (Android: `0.1`–`2.0`; iOS: varies based on `AVSpeechUtterance` limits).

**Example Usage:**

```ts
Speech.initialize({
  language: 'en-US',
  volume: 1.0,
  pitch: 1.2,
  rate: 0.8,
});
```

---

### Resetting Speech Options

Reset all global speech options to their default values.

**API Definition:**

```ts
Speech.reset(): void
```

**Example Usage:**

```ts
Speech.reset();
```

---

### Speaking Text

Speak a given text using the current global settings.

**API Definition:**

```ts
Speech.speak(text: string): Promise<void>
```

**Example Usage:**

```ts
Speech.speak('Hello, world!');
```

---

### Speaking Text with Custom Options

Override global options for a specific utterance.

**API Definition:**

```ts
Speech.speakWithOptions(text: string, options: VoiceOptions): Promise<void>
```

**Example Usage:**

```ts
Speech.speakWithOptions('Hello!', {
  language: 'en-US',
  pitch: 1.5,
  rate: 0.8,
});
```

---

### Controlling Speech

#### **Stop Speech**

Immediately stops any ongoing or in queue speech synthesis.

```ts
Speech.stop().then(() => console.log('Speech stopped'));
```

#### **Pause Speech**

> **Note:** On Android, API 26+ (Android 8+) required.

```ts
Speech.pause().then(isPaused => {
  console.log(isPaused ? 'Speech paused' : 'Nothing to pause');
});
```

#### **Resume Speech**

> **Note:** On Android, API 26+ (Android 8+) required.

```ts
Speech.resume().then(isResumed => {
  console.log(isResumed ? 'Speech resumed' : 'Nothing to resume');
});
```

#### **Check if Speaking**

Determine if speech synthesis is currently active.

```ts
Speech.isSpeaking().then(isSpeaking => {
  console.log(isSpeaking ? 'Currently speaking or paused' : 'Not speaking');
});
```

---

### Event Callbacks

Subscribe to event callbacks for speech synthesis lifecycle monitoring.

#### **onError**

Triggers when an error occurs.

```ts
const errorSubscription = Speech.onError(({id}) => {
  console.error(`Speech error (ID: ${id})`);
});

//Cleanup
errorSubscription.remove();
```

#### **onStart**

Triggers when speech starts.

```ts
const startSubscription = Speech.onStart(({id}) => {
  console.log(`Speech started (ID: ${id})`);
});

//Cleanup
startSubscription.remove();
```

#### **onFinish**

Triggers when speech completes.

```ts
const finishSubscription = Speech.onFinish(({id}) => {
  console.log(`Speech finished (ID: ${id})`);
});

//Cleanup
finishSubscription.remove();
```

#### **onPause**

Triggers when speech paused.

> **Note:** On Android, API 26+ (Android 8+) required.

```ts
const pauseSubscription = Speech.onPause(({id}) => {
  console.log(`Speech paused (ID: ${id})`);
});

//Cleanup
pauseSubscription.remove();
```

#### **onResume**

Triggers when speech resumed.

> **Note:** On Android, API 26+ (Android 8+) required.

```ts
const resumeSubscription = Speech.onResume(({id}) => {
  console.log(`Speech resumed (ID: ${id})`);
});

//Cleanup
resumeSubscription.remove();
```

#### **onStopped**

Triggers when speech is stopped.

```ts
const stoppedSubscription = Speech.onStopped(({id}) => {
  console.log(`Speech stopped (ID: ${id})`);
});

//Cleanup
stoppedSubscription.remove();
```

#### **onProgress**

> **Note:** On Android, API 26+ (Android 8+) required.

**Callback Parameters:**

- `id`: The uttenrance identifier
- `length`: The text being spoken length
- `location`: The current position in the spoken text

```ts
const progressSubscription = Speech.onProgress(({id, location, length}) => {
  console.log(
    `Speech ${id} progress, current word length: ${length}, current char position: ${location}`,
  );
});

//Cleanup
progressSubscription.remove();
```

---

## Example Application

Check out the [example project](../example/).
