<p align="center">
  <a href="https://mhpdev.com" target="_blank">
    <img src="./docs/banner.png" alt="React Native Full Responsive Banner" style="max-width:100%;height:auto;" />
  </a>
</p>

A high-performance text-to-speech library built for bare React Native and Expo, compatible with Android and iOS. It enables seamless speech management and provides events for detailed synthesis management.

<div align="center">
  <a href="./docs/USAGE.md">Documentation</a> · <a href="./example/">Example</a>
</div>
<br/>

> **Only New Architecture**: This library is currently compatible with the new architecture. If you're using React Native 0.76 or higher, it is already enabled. However, if your React Native version is between 0.68 and 0.75, you need to enable it first. [Click here if you need help enabling the new architecture](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md)

## Preview

|                                                                                                          <center>Android</center>                                                                                                           |                                                                                                          <center>iOS</center>                                                                                                           |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <video src="https://github.com/user-attachments/assets/0601b827-a87a-4eb0-be28-273aa2ec5942" controls width="100%" height="500"></video> [Android Preview](https://github.com/user-attachments/assets/0601b827-a87a-4eb0-be28-273aa2ec5942) | <video src="https://github.com/user-attachments/assets/1579639e-049b-42f4-9795-bc56956541bd" width="100%" height="500" controls></video> [iOS Preview](https://github.com/user-attachments/assets/1579639e-049b-42f4-9795-bc56956541bd) |

## Features

- 🚀 &nbsp;High-performance library built with Turbo Modules for Android and iOS

- 🎛️ &nbsp;Provides essential methods for full control over synthesis

- 🪄 &nbsp;Support for the `pause` and `resume` methods—including the `onPause` and `onResume` events—on Android as well. Unlike iOS, which natively provides these features, this library implements its own handling on Android (API 26+ required)

- 📡 &nbsp;Offers useful events for more precise control over synthesis

- 💅 &nbsp;Includes a customizable [HighlightedText](./docs/USAGE.md#highlightedtext) component to display the currently spoken text

- ✅ &nbsp;Fully type-safe and written in TypeScript

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

For iOS, navigate to the ios directory and install the pods:

```sh
cd ios && pod install
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

## Testing

To mock the package's methods and components using the default mock configuration provided, follow these steps:

- Create a file named `@mhpdev/react-native-speech.ts` inside your `__mocks__` directory.

- Copy the following code into that file:

  ```js
  module.exports = require('@mhpdev/react-native-speech/jest');
  ```

## Contributing

See the [contributing guide](./docs/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
