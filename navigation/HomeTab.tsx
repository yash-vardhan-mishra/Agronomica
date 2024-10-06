import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../containers/Home/Home';
import Profile from '../containers/Profile/Profile';
import EmployeeManagement from '../containers/EmployeeMangement/EmployeeManagement';
import FarmsManagement from '../containers/FarmsManagement/FarmsManagement';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Colors from '../constants/Colors';

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
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { height: 92, paddingBottom: 12 },
            tabBarIcon: ({ color, size, focused }) => {
                let iconName

                if (route.name === 'Home') {
                    iconName = 'home-outline'; // Icon for Home tab
                } else if (route.name === 'Employees') {
                    iconName = 'people-circle-outline'; // Icon for Profile tab
                } else if (route.name === 'Farms') {
                    iconName = 'image-outline'; // Icon for Profile tab
                } else if (route.name === 'Profile') {
                    iconName = 'person-outline'; // Icon for Profile tab
                }

                // You can return any component that renders an icon from your library
                return <View style={{ backgroundColor: focused ? Colors.amber : Colors.lightGrey, height: 44, width: 44, borderRadius: 180, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={iconName} size={size} color={color} />
                </View>
            },
            tabBarActiveTintColor: Colors.black, // Active tab color
            tabBarInactiveTintColor: 'rgba(1,1,1,0.5)',  // Inactive tab color
            tabBarLabelStyle: {
                paddingBottom: 12,
                marginTop: -8,  // Reduce this value to decrease space between icon and label
            },
        })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Employees" component={EmployeeManagement} />
            <Tab.Screen name="Farms" component={FarmsManagement} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}