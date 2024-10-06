import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../containers/Home/Home';
import Profile from '../containers/Profile/Profile';
import EmployeeManagement from '../containers/EmployeeMangement/EmployeeManagement';
import FarmsManagement from '../containers/FarmsManagement/FarmsManagement';

const Tab = createBottomTabNavigator();

export type HomeTabParamList = {
    Home: undefined;
    Profile: undefined;
    EmployeeManagement: undefined;
    FarmsManagement: undefined;
    AddField: undefined;
    OnboardEmployee: undefined;
    EmployeeDetails: {
        employeeId: string; 
    };
    FarmDetails: {
        fieldId: string; 
    };
};

export default function HomeTab() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Employees" component={EmployeeManagement} />
            <Tab.Screen name="Farms" component={FarmsManagement} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}