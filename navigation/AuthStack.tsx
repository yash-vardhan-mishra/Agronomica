import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileCreation from '../containers/ProfileCreation/ProfileCreation';
import HomeTab from './HomeTab';
import AddFarm from '../containers/FarmsManagement/AddFarm';


const AuthStack = createNativeStackNavigator();

export type AuthStackParamList = {
  HomeTab: undefined;
  ProfileCreation: undefined;
  AddFarm: undefined;
};

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="HomeTab" component={HomeTab} />
      <AuthStack.Screen name="ProfileCreation" component={ProfileCreation} />
      <AuthStack.Screen name="AddFarm" component={AddFarm} />
    </AuthStack.Navigator>
  );
}
