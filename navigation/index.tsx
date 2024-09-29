import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './service';
import UnauthStack from './UnauthStack';
import AuthStack from './AuthStack';
import { useAuth } from '../contexts/AuthContext';

export type RootStackParamList = {
  UnauthStack: undefined;
  AuthStack: { screen: string } | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackScreen: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <RootStack.Screen name="UnauthStack" component={UnauthStack} />
      )}
    </RootStack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen />
    </NavigationContainer>
  );
}
