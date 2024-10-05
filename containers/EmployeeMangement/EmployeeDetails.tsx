import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import Header from '../../components/molecules/Header';
import styles from './EmployeeDetails.styles';
import { Dropdown } from 'react-native-element-dropdown'; // Import Dropdown component
import { getEmployeeById } from '../../services/employee'; // Import the getEmployeeById API
import { useAuth } from '../../contexts/AuthContext'; // To get the auth token
import CustomButton from '../../components/molecules/CustomButton';
import CustomTextBoxWithTitle from '../../components/molecules/CustomTextBoxWithTitle';
import { useLoading } from '../../contexts/LoadingContext'; // For loading indicator
import { showError } from '../../components/molecules/OtpTextInput/utils'; // Utility to show errors
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import CustomText from '../../components/atoms/CustomText/CustomText';

type EmployeeDetailsRouteProp = RouteProp<AuthStackParamList, 'EmployeeDetails'>;

const employeeRoles = [
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Worker', value: 'worker' }
];

const EmployeeDetails = () => {
    const { authToken } = useAuth(); // Get the auth token from context
    const [employee, setEmployee] = useState<any>(null); // State to store employee details
    const { setLoading } = useLoading(); // For showing loading indicator
    const navigation = useNavigation();
    const route = useRoute<EmployeeDetailsRouteProp>();
    const { employeeId } = route.params; // Get the employeeId from route params

    const [selectedRole, setSelectedRole] = useState(''); // State for selected role
    const [isRoleChanged, setIsRoleChanged] = useState(false); // State to track if role has changed

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            setLoading(true);
            try {
                const response = await getEmployeeById(authToken, employeeId); // Call getEmployeeById API
                setEmployee(response?.data); // Assuming the response has a 'data' object with employee details
                setSelectedRole(response?.data?.employeeRole); // Set initial employee role
            } catch (err) {
                showError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [authToken, employeeId]); // Dependency array includes authToken and employeeId

    if (!employee) {
        return null; // Return null if no employee data is available yet
    }

    // Extract employee details from the employee object
    const { firstName, lastName, contactNumber, email } = employee;

    const handleRoleChange = (roleValue: string) => {
        setSelectedRole(roleValue);
        if (roleValue !== employee.employeeRole) {
            setIsRoleChanged(true); // Enable button if role is changed
        } else {
            setIsRoleChanged(false); // Disable button if role is not changed
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header isBackButtonVisible onBackPress={() => navigation.goBack()} title="Employee Details" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    {/* Display Employee Details */}
                    <CustomTextBoxWithTitle title='First Name' editable={false} value={firstName || ''} />
                    <CustomTextBoxWithTitle title='Last Name' editable={false} value={lastName || ''} />
                    <CustomTextBoxWithTitle title='Contact Number' editable={false} value={contactNumber || ''} />
                    <CustomTextBoxWithTitle title='Email' editable={false} value={email || ''} />

                    {/* Dropdown for Employee Role */}
                    <View style={styles.dropdownContainer}>
                    <CustomText
                        style={{ marginBottom: 8 }}
                        weight='500'
                        size={12}
                    >
                        Employee Role
                    </CustomText>
                        <Dropdown
                            containerStyle={{ borderRadius: 8 }}
                            selectedTextStyle={styles.dropdownTextStyle}
                            itemTextStyle={styles.dropdownTextStyle}
                            placeholderStyle={styles.dropdownPlaceholderStyle}
                            style={styles.dropdown}
                            data={employeeRoles}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Employee Role"
                            value={selectedRole} // Current selected role
                            onChange={item => handleRoleChange(item.value)} // Update selected role
                        />
                    </View>
                </View>

                {/* Submit Button */}
                <CustomButton
                    label="Update Role"
                    onPress={() => console.log('Role updated:', selectedRole)} // Add your role update logic here
                    disabled={!isRoleChanged} // Disable button unless role changes
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default EmployeeDetails;
