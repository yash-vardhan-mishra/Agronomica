import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation';
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingScreen from './containers/LoadingScreen';

export default function App() {
  return (
    <LoadingProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
          <LoadingScreen />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </LoadingProvider>
  );
}
