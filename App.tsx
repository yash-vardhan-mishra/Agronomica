import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation';
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingScreen from './containers/LoadingScreen';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileProvider';

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ProfileProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Navigation />
              <LoadingScreen />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ProfileProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
