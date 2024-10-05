import React, { useCallback, useEffect, useState } from 'react';
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
import CustomText from '../../components/atoms/CustomText/CustomText';
import { FontAwesome6 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useFields } from '../../contexts/FieldsDetailsContext';
import { useFocusEffect } from '@react-navigation/native';

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
    const { fields, fetchFieldsData } = useFields(); // Get fields from the Fields context

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        employeeEmail: '',
        contactNumber: '',
        employeeRole: '',
    });

    const [selectedField, setSelectedField] = useState(''); // State for the selected field

    const { firstName, lastName, employeeEmail, contactNumber, employeeRole } = state;

    useFocusEffect(
        useCallback(() => {
            const loadFields = async () => {
                await fetchFieldsData();
            };

            if (fields.length === 0) {
                loadFields();
            }

        }, [fetchFieldsData])
    );

    const onBackPress = () => {
        navigation.goBack();
    };

    const handleChange = (type: string, value: string) => {
        setState(prevState => ({ ...prevState, [type]: value }));
    };

    const handleEmployeeRoleChange = (value: string) => {
        setState(prevState => ({ ...prevState, employeeRole: value }));
    };

    const handleFieldChange = (value: string) => {
        setSelectedField(value); // Update the selected field state
    };

    const isButtonEnabled = firstName && lastName && employeeEmail && contactNumber && employeeRole && selectedField;

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
            employeeRole,
            fieldId: selectedField
        };

        onboardEmployee(authToken, requestBody)
            .then(data => {
                navigation.replace('OnboardEmployeeOtpVerification', {
                    employeeEmail,
                    employeeRole,
                    firstName,
                    lastName,
                    contactNumber,
                    fieldId: selectedField
                });
            })
            .catch(err => {
                showError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Custom renderItem with an icon on the right
    const renderDropdownItem = (item: any) => {
        let iconName = 'wheat-awn'
        switch (item.type) {
            case 'Farm':
                iconName = 'wheat-awn'
                break;
            case 'Orchard':
                iconName = 'apple-whole'
                break;
            case 'Pasture':
                iconName = 'cow'
                break;

            default:
                break;
        }
        return (
            <View style={styles.dropdownItemContainer}>
                <CustomText color={Colors.romanSilver} weight='500' size={14}>{item.label}</CustomText>
                <FontAwesome6 color={Colors.romanSilver2} name={iconName} size={18} />
            </View>
        );
    };

    // Map fields to dropdown format
    const fieldTypes = fields.map(field => ({
        label: field.fieldName,
        value: field.fieldId,
        type: field.fieldType
    }));

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Onboard Employee" isBackButtonVisible onBackPress={onBackPress} />
            <CustomKeyboardAvoidingView>
                <View style={styles.inputContainer}>
                    {/* Dropdown for Field Type */}
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            maxHeight={200}
                            containerStyle={{ borderRadius: 8 }}
                            selectedTextStyle={styles.dropdownTextStyle}
                            itemTextStyle={styles.dropdownTextStyle}
                            placeholderStyle={styles.dropdownPlaceholderStyle}
                            style={styles.dropdown}
                            data={fieldTypes}
                            labelField="label"
                            valueField="value"
                            placeholder="Assign a field to an employee"
                            renderItem={renderDropdownItem}  // Custom renderItem
                            value={selectedField}
                            onChange={item => handleFieldChange(item.value)} // Update selected field
                        />
                    </View>
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
                        maxLength={13}
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
                </View>
            </CustomKeyboardAvoidingView>
            <CustomButton style={{ marginHorizontal: 20, marginBottom: 20 }} label="Submit" disabled={!isButtonEnabled} onPress={submitForm} />
        </SafeAreaView>
    );
};

export default OnboardEmployee;
