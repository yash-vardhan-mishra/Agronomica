import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './service';
import UnauthStack from './UnauthStack';
import AuthStack from './AuthStack';

export type RootStackParamList = {
  UnauthStack: undefined;
  AuthStack: { screen: string } | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="UnauthStack" component={UnauthStack} />
      <RootStack.Screen name="AuthStack" component={AuthStack} />
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