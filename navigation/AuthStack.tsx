import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../containers/Home/Home';
import ProfileCreation from '../containers/ProfileCreation/ProfileCreation';


const AuthStack = createNativeStackNavigator();

export type AuthStackParamList = {
  Home: undefined;
  ProfileCreation: undefined;
};

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="ProfileCreation" component={ProfileCreation} />
    </AuthStack.Navigator>
  );
}
