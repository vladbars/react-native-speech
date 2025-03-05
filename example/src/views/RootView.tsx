import React from 'react';
import {gs} from '../styles/gs';
import {Text, View} from 'react-native';
import Button from '../components/Button';
import Speech from '@mhpdev/react-native-speech';
import {SafeAreaView} from 'react-native-safe-area-context';

const Introduction =
  "This high-performance text-to-speech library is built for bare React Native and Expo, compatible with Android and iOS's new architecture (default from React Native 0.76). It enables seamless speech management with start, pause, resume, and stop controls, and provides events for detailed synthesis management.";

const RootView: React.FC = () => {
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);

  React.useEffect(() => {
    const startSubscription = Speech.onStart(({id}) => {
      console.log(`Speech ${id} started`);
    });
    const finishSubscription = Speech.onFinish(({id}) => {
      setIsStarted(false);
      setIsPaused(false);
      console.log(`Speech ${id} finished`);
    });
    const pauseSubscription = Speech.onPause(({id}) => {
      setIsPaused(true);
      console.log(`Speech ${id} paused`);
    });
    const resumeSubscription = Speech.onResume(({id}) => {
      console.log(`Speech ${id} resumed`);
    });
    const stoppedSubscription = Speech.onStopped(({id}) => {
      setIsStarted(false);
      setIsPaused(false);
      console.log(`Speech ${id} stopped`);
    });
    const progressSubscription = Speech.onProgress(({id, location, length}) => {
      console.log(
        `Speech ${id} progress, current word length: ${length}, current char position: ${location}`,
      );
    });

    (async () => {
      const enVoices = await Speech.getAvailableVoices('en-us');
      Speech.initialize({
        rate: 0.5,
        volume: 1,
        voice: enVoices[4]?.identifier,
      });
    })();

    return () => {
      startSubscription.remove();
      finishSubscription.remove();
      pauseSubscription.remove();
      resumeSubscription.remove();
      stoppedSubscription.remove();
      progressSubscription.remove();
    };
  }, []);

  const onStartPress = React.useCallback(() => {
    setIsStarted(true);
    Speech.speak(Introduction);
  }, []);

  const onResumePress = React.useCallback(() => {
    setIsPaused(false);
    Speech.resume();
  }, []);

  return (
    <SafeAreaView style={[gs.flex, gs.p10]}>
      <View style={gs.flex}>
        <Text style={gs.title}>Introduction</Text>
        <Text style={gs.paragraph}>{Introduction}</Text>
      </View>
      <View style={[gs.row, gs.p10]}>
        <Button label="Start" disabled={isStarted} onPress={onStartPress} />
        <Button label="Stop" disabled={!isStarted} onPress={Speech.stop} />
        <Button
          label="Pause"
          onPress={Speech.pause}
          disabled={isPaused || !isStarted}
        />
        <Button label="Resume" disabled={!isPaused} onPress={onResumePress} />
      </View>
    </SafeAreaView>
  );
};

export default RootView;
