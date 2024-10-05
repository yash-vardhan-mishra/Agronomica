import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation';
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingScreen from './containers/LoadingScreen';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileProvider';
import { FieldsDetailsProvider } from './contexts/FieldsDetailsContext';  // Import FieldsDetailsProvider

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ProfileProvider>
          <FieldsDetailsProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Navigation />
                <LoadingScreen />
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </FieldsDetailsProvider>
        </ProfileProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
