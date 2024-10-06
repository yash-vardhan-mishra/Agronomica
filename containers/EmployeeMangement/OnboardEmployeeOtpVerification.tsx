import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import CustomButton from '../../components/molecules/CustomButton';
import styles from './OnboardEmployeeOtpVerification.styles';
import CustomText from '../../components/atoms/CustomText/CustomText';
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView';
import OtpTextInput from '../../components/molecules/OtpTextInput/OtpTextInput';
import BackButton from '../../components/atoms/BackButton';
import { useLoading } from '../../contexts/LoadingContext';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { verifyOtpForOnboardedEmployee } from '../../services/employee';
import { useAuth } from '../../contexts/AuthContext';
import { showError } from '../../components/molecules/OtpTextInput/utils';

type OnboardEmployeeOtpVerificationProp = RouteProp<AuthStackParamList, 'OnboardEmployeeOtpVerification'>;

const OnboardEmployeeOtpVerification = () => {
    const { authToken } = useAuth(); // Get the auth token from context
    const { setLoading } = useLoading();
    const route = useRoute<OnboardEmployeeOtpVerificationProp>();
    const {
        employeeEmail,
        employeeRole,
        firstName,
        lastName,
        contactNumber,
        fieldId }
        = route.params;
    const navigation = useNavigation();

    const [otp, setOtp] = useState('');

    const submitForm = () => {
        setLoading(true);
        verifyOtpForOnboardedEmployee(authToken, {
            otp,
            employeeEmail,
            employeeRole,
            firstName,
            lastName,
            contactNumber,
            fieldId
        })
            .then(() => {
                Alert.alert('Onboarding Initiated', "Login details have been shared on employee's email account!");
                navigation.goBack();
            })
            .catch(err => {
                showError(err)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const isButtonEnabled = otp.length === 4;

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
            <CustomKeyboardAvoidingView>
                <View style={styles.formInnerContainer}>
                    <CustomText weight='700' size={32}>
                        Verify OTP
                    </CustomText>
                    <View style={styles.otpInputOuterContainer}>
                        <OtpTextInput otp={otp} setOtp={setOtp} digits={4} />
                        <CustomButton disabled={!isButtonEnabled} label='Verify' onPress={submitForm} />
                    </View>
                </View>
            </CustomKeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default OnboardEmployeeOtpVerification;
