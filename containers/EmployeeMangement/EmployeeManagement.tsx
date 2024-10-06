import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Pressable } from 'react-native';
import styles from './EmployeeManagement.styles';
import Header from '../../components/molecules/Header';
import CustomText from '../../components/atoms/CustomText/CustomText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { getEmployees } from '../../services/employee';
import { useAuth } from '../../contexts/AuthContext';  // Assuming you have an Auth context for the token
import { useLoading } from '../../contexts/LoadingContext';  // Loading context to handle the loader
import { useFocusEffect } from '@react-navigation/native';
import { showError } from '../../components/molecules/OtpTextInput/utils'; // Utility to handle errors
import { useFields } from '../../contexts/FieldsDetailsContext';

type EmployeeManagementNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'EmployeeManagement'>;

interface EmployeeManagementProps {
    navigation: EmployeeManagementNavigationProp;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ navigation }) => {
    const { authToken } = useAuth(); // Get the auth token from the context
    const [employees, setEmployees] = useState<any[]>([]); // State for storing employees data
    const { setLoading } = useLoading(); // For showing the loading indicator
    const { fetchFieldsData } = useFields();

    useEffect(() => {
        fetchFieldsData()
    }, [])

    useFocusEffect(
        useCallback(() => {
            // Fetch employees when the screen is focused
            const fetchEmployees = async () => {
                setLoading(true);
                try {
                    const response = await getEmployees(authToken); // Call getEmployees API
                    console.log('Employee data:', response);
                    setEmployees(response?.data || []); // Assuming the response has a 'data' array
                } catch (err) {
                    showError(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchEmployees();
        }, [authToken])  // Dependency array to ensure token availability
    );

    // Function to render the employee list
    const renderEmployees = () => {
        if (employees.length === 0) {
            return <CustomText>No employees exist</CustomText>;
        }

        return employees.map((employee, index) => (
            <Pressable
                onPress={() =>
                    navigation.navigate('EmployeeDetails', { employeeId: employee.employeeId })
                }
                key={index} style={styles.employeeItem}>
                <CustomText>{employee.firstName} {employee.lastName}</CustomText>
                <CustomText>{employee.employeeRole}</CustomText>
                <CustomText>{employee.contactNumber}</CustomText>
            </Pressable>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Employee Management" rightIcon='person-add-outline' onRightIconPress={() => navigation.navigate('OnboardEmployee')} />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    {renderEmployees()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EmployeeManagement;
