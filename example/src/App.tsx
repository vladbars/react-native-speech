import RootView from './views/RootView';
import {FRProvider} from 'react-native-full-responsive';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <FRProvider>
        <RootView />
      </FRProvider>
    </SafeAreaProvider>
  );
}
