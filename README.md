# react-native-speech

A high-performance text-to-speech library built for bare React Native and Expo, compatible with Android and iOS. It enables seamless speech management and provides events for detailed synthesis management.

> **Only New Architecture**: This library is currently compatible with the new architecture. If you're using React Native 0.76 or higher, it is already enabled. However, if your React Native version is between 0.68 and 0.75, you need to enable it first. [Click here if you need help enabling the new architecture](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md)

<br/>
<div align="center">
  <a href="./docs/USAGE.md">Documentation</a> · <a href="./example/">Example</a>
</div>

## Preview

|                                <center>Android</center>                                 |                                <center>iOS</center>                                |
| :-------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| <br><video src="./docs//android-preview.mp4" controls width="250" height="500"></video> | <br><video src="./docs/ios-preview.mp4" width="250" height="500" controls></video> |

## Features

- 🚀 High-performance library created with Turbo Modules for both Android and iOS

- 🎛️ Provides essential and useful methods for full control over synthesis

- 😎 Support for `pause` and `resume`, along with `onResume` and `onPause` events, for Android too. (If you have prior experience using text-to-speech, particularly on Android, note that unlike iOS, it doesn’t natively support these features, and this library handles them itself)

- 📡 Offers useful events for more precise control over synthesis

- ✅ Completely type-safe and written in TypeScript (on the React Native side)

## Installation

### Bare React Native

```sh
npm install @mhpdev/react-native-speech
```

Or using Yarn:

```sh
yarn add @mhpdev/react-native-speech
```

### Expo

Step 1:

```sh
npx expo install @mhpdev/react-native-speech
```

Step 2 (since it is not supported on Expo Go):

```sh
npx expo prebuild
```

## Usage

To learn how to use the library, check out the [usage section](./docs/USAGE.md).

## Quick Start

```tsx
import React from 'react';
import Speech from '@mhpdev/react-native-speech';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const App: React.FC = () => {
  const onSpeakPress = () => {
    Speech.speak('Hello World!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSpeakPress}>
        <Text style={styles.buttonText}>Speak</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 12.5,
    borderRadius: 5,
    backgroundColor: 'skyblue',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
  },
});
```

To become more familiar with the usage of the library, check out the [example project](./example/).

## Contributing

See the [contributing guide](./docs/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
