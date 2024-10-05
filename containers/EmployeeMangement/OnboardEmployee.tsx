import React, { useEffect, useState } from 'react';
import { SafeAreaView, Alert, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView';
import Header from '../../components/molecules/Header';
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox';
import CustomButton from '../../components/molecules/CustomButton';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import { onboardEmployee } from '../../services/employee';
import styles from './OnboardEmployee.styles';
import { showError } from '../../components/molecules/OtpTextInput/utils';

type AddFieldNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OnboardEmployee'>;

interface OnboardEmployeeProps {
    navigation: AddFieldNavigationProp;
}

const employeeTypes = [
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Worker', value: 'worker' }
];

const OnboardEmployee: React.FC<OnboardEmployeeProps> = ({ navigation }) => {
    const { authToken } = useAuth(); // Get the auth token from context
    const { setLoading } = useLoading();

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        employeeEmail: '',
        contactNumber: '',
        employeeRole: '',
    });

    const { firstName, lastName, employeeEmail, contactNumber, employeeRole } = state;

    const onBackPress = () => {
        navigation.goBack();
    };

    const handleChange = (type: string, value: string) => {
        setState(prevState => ({ ...prevState, [type]: value }));
    };

    const handleEmployeeRoleChange = (value: string) => {
        setState(prevState => ({ ...prevState, employeeRole: value }));
    };

    const isButtonEnabled = firstName && lastName && employeeEmail && contactNumber && employeeRole;

    const submitForm = () => {
        setLoading(true);
        if (!isButtonEnabled) {
            Alert.alert('Error', 'Please fill all the fields.');
            setLoading(false);
            return;
        }

        const requestBody = {
            firstName,
            lastName,
            employeeEmail,
            contactNumber,
            employeeRole
        };

        onboardEmployee(authToken, requestBody)
            .then(data => {
                navigation.navigate('OnboardEmployeeOtpVerification', {
                    employeeEmail,
                    employeeRole,
                    firstName,
                    lastName,
                    contactNumber
                })
            })
            .catch(err => {
                showError(err)
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <Header title="Onboard Employee" isBackButtonVisible onBackPress={onBackPress} />
                <View style={styles.inputContainer}>
                    {/* First Name Input */}
                    <CustomTextBox
                        style={styles.textBoxContainer}
                        value={firstName}
                        onChangeText={val => handleChange('firstName', val)}
                        placeholder="First Name"
                    />

                    {/* Last Name Input */}
                    <CustomTextBox
                        style={styles.textBoxContainer}
                        value={lastName}
                        onChangeText={val => handleChange('lastName', val)}
                        placeholder="Last Name"
                    />

                    {/* Employee Email Input */}
                    <CustomTextBox
                        style={styles.textBoxContainer}
                        keyboardType="email-address"
                        value={employeeEmail}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={val => handleChange('employeeEmail', val)}
                        placeholder="Employee Email"
                    />

                    {/* Employee Phone Input */}
                    <CustomTextBox
                        style={styles.textBoxContainer}
                        keyboardType="phone-pad"
                        value={contactNumber}
                        onChangeText={val => handleChange('contactNumber', val)}
                        placeholder="Contact Number"
                    />

                    {/* Dropdown for Employee Role */}
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            containerStyle={{ borderRadius: 8 }}
                            selectedTextStyle={styles.dropdownTextStyle}
                            itemTextStyle={styles.dropdownTextStyle}
                            placeholderStyle={styles.dropdownPlaceholderStyle}
                            style={styles.dropdown}
                            data={employeeTypes}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Employee Role"
                            value={employeeRole}
                            onChange={item => handleEmployeeRoleChange(item.value)}
                        />
                    </View>

                    {/* Submit Button */}
                    <CustomButton label="Submit" disabled={!isButtonEnabled} onPress={submitForm} />
                </View>
            </CustomKeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default OnboardEmployee;
