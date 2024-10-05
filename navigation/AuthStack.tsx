import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileCreation from '../containers/ProfileCreation/ProfileCreation';
import HomeTab from './HomeTab';
import AddField from '../containers/FarmsManagement/AddField';
import OnboardEmployee from '../containers/EmployeeMangement/OnboardEmployee';
import OnboardEmployeeOtpVerification from '../containers/EmployeeMangement/OnboardEmployeeOtpVerification'; // Import the new screen
import EmployeeDetails from '../containers/EmployeeMangement/EmployeeDetails';

const AuthStack = createNativeStackNavigator();

export type AuthStackParamList = {
  HomeTab: undefined;
  ProfileCreation: undefined;
  AddField: undefined;
  OnboardEmployee: undefined;
  OnboardEmployeeOtpVerification: {
    employeeEmail: string; 
    employeeRole: string;
    firstName: string,
    lastName: string;
    contactNumber: string;
    fieldId: string;
  };
  EmployeeDetails: {
    employeeId: string; 
  };
};

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="HomeTab" component={HomeTab} />
      <AuthStack.Screen name="ProfileCreation" component={ProfileCreation} />
      <AuthStack.Screen name="AddField" component={AddField} />
      <AuthStack.Screen name="OnboardEmployee" component={OnboardEmployee} />
      <AuthStack.Screen
        name="OnboardEmployeeOtpVerification"
        component={OnboardEmployeeOtpVerification}
      />
      <AuthStack.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
      />
    </AuthStack.Navigator>
  );
}
