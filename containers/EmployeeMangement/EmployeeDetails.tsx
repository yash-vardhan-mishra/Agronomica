import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, ScrollView, View } from 'react-native';
import Header from '../../components/molecules/Header';
import styles from './EmployeeDetails.styles';
import { Dropdown } from 'react-native-element-dropdown';
import { getEmployeeById, updateEmployee } from '../../services/employee';
import { useAuth } from '../../contexts/AuthContext';
import CustomButton from '../../components/molecules/CustomButton';
import CustomTextBoxWithTitle from '../../components/molecules/CustomTextBoxWithTitle';
import { useLoading } from '../../contexts/LoadingContext';
import { showError } from '../../components/molecules/OtpTextInput/utils';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import CustomText from '../../components/atoms/CustomText/CustomText';
import { useFields } from '../../contexts/FieldsDetailsContext';
import { FontAwesome6 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type EmployeeDetailsRouteProp = RouteProp<AuthStackParamList, 'EmployeeDetails'>;

const employeeRoles = [
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Worker', value: 'worker' }
];

const EmployeeDetails = () => {
    const { authToken } = useAuth();
    const [employee, setEmployee] = useState<any>(null);
    const { setLoading } = useLoading();
    const navigation = useNavigation();
    const route = useRoute<EmployeeDetailsRouteProp>();
    const { employeeId } = route.params;
    const { fields } = useFields();

    const [selectedRole, setSelectedRole] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [isRoleChanged, setIsRoleChanged] = useState(false);
    const [isFieldChanged, setIsFieldChanged] = useState(false);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            setLoading(true);
            try {
                const response = await getEmployeeById(authToken, employeeId);
                setEmployee(response?.data);
                setSelectedRole(response?.data?.employeeRole);
                setSelectedField(response?.data?.fieldId || '');
            } catch (err) {
                showError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [authToken, employeeId]);

    if (!employee) {
        return null;
    }

    const { firstName, lastName, contactNumber, email } = employee;

    const handleRoleChange = (roleValue: string) => {
        setSelectedRole(roleValue);
        setIsRoleChanged(roleValue !== employee.employeeRole);
    };

    const handleFieldChange = (fieldValue: string) => {
        setSelectedField(fieldValue);
        setIsFieldChanged(fieldValue !== employee.fieldId);
    };

    const isButtonEnabled = isRoleChanged || isFieldChanged;

    const renderField = (item: any) => {
        let iconName = 'wheat-awn';
        switch (item.type) {
            case 'Farm':
                iconName = 'wheat-awn';
                break;
            case 'Orchard':
                iconName = 'apple-whole';
                break;
            case 'Pasture':
                iconName = 'cow';
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

    const fieldTypes = fields.map(field => ({
        label: field.fieldName,
        value: field.fieldId,
        type: field.fieldType
    }));

    const handleUpdateEmployee = async () => {
        if (isButtonEnabled) {
            setLoading(true);
            try {
                await updateEmployee(authToken, {
                    employeeId,
                    employeeRole: selectedRole,
                    fieldId: selectedField,
                });
                Alert.alert('Success', 'Employee updated successfully!');
                navigation.goBack(); // Navigate back after successful update
            } catch (err) {
                showError(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header isBackButtonVisible onBackPress={() => navigation.goBack()} title="Employee Details" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.dropdownContainer}>
                        <CustomText style={{ marginBottom: 8 }} weight='500' size={12}>
                            Assign a Different Field
                        </CustomText>
                        <Dropdown
                            containerStyle={{ borderRadius: 8 }}
                            selectedTextStyle={styles.dropdownTextStyle}
                            itemTextStyle={styles.dropdownTextStyle}
                            placeholderStyle={styles.dropdownPlaceholderStyle}
                            style={styles.dropdown}
                            data={fieldTypes}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Field"
                            renderItem={renderField}
                            value={selectedField}
                            onChange={item => handleFieldChange(item.value)}
                        />
                    </View>
                    <CustomTextBoxWithTitle title='First Name' editable={false} value={firstName || ''} />
                    <CustomTextBoxWithTitle title='Last Name' editable={false} value={lastName || ''} />
                    <CustomTextBoxWithTitle title='Contact Number' editable={false} value={contactNumber || ''} />
                    <CustomTextBoxWithTitle title='Email' editable={false} value={email || ''} />

                    <View style={styles.dropdownContainer}>
                        <CustomText style={{ marginBottom: 8 }} weight='500' size={12}>
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
                            value={selectedRole}
                            onChange={item => handleRoleChange(item.value)}
                        />
                    </View>
                </View>
            </ScrollView>
            <CustomButton
                style={{ marginHorizontal: 20, marginBottom: 20 }}
                label="Update"
                onPress={handleUpdateEmployee}
                disabled={!isButtonEnabled}
            />
        </SafeAreaView>
    );
};

export default EmployeeDetails;
