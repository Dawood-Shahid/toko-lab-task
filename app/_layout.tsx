import 'react-native-reanimated';

import { Text, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {

  return (
      <SafeAreaView style={{ minHeight: '100%' }}>
        <Text>React Native Expo App</Text>
    </SafeAreaView>
  );
}
