import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProfileCreations.styles';
import Header from '../../components/molecules/Header';
import { Alert, View } from 'react-native';
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox';
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView';
import Regex from '../../constants/Regex';
import CustomButton from '../../components/molecules/CustomButton';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import { updateProfile } from '../../services/profile';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';

type ProfileCreationNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ProfileCreation'>; // Define the type for navigation

interface ProfileCreationProps {
    navigation: ProfileCreationNavigationProp;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ navigation }) => {
    const { authToken } = useAuth();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        contactNumber: ''
    });
    const { setLoading } = useLoading();

    const handleChange = (type: string, val: string) => {
        setState(prevVal => ({ ...prevVal, [type]: val }));
    };

    const { firstName, lastName, contactNumber } = state;

    const updateFarmerInfo = () => {
        setLoading(true);
        updateProfile(authToken, firstName, lastName, contactNumber).then(res => {
            navigation.navigate('HomeTab');
        }).catch(err => {
            Alert.alert('Error,', err.message || 'Something went wrong')
        }).finally(() => {
            setLoading(false);
        });
    };

    const submitForm = () => {
        if (firstName.length < 2 || lastName.length < 2) {
            Alert.alert('Error', 'Both your first and last name should be at least 2 characters long');
        } else if (!Regex.contactNumberRegex.test(contactNumber)) {
            Alert.alert('Error', 'Please enter a valid Australian or New Zealand phone number');
        } else {
            updateFarmerInfo();
        }
    };

    const isButtonEnabled = firstName && lastName && contactNumber;

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <Header title="Create Profile" />
                <View style={styles.inputContainer}>
                    <CustomTextBox style={styles.textBoxContainer} value={firstName} onChangeText={(val) => handleChange('firstName', val)} placeholder='First Name' />
                    <CustomTextBox style={styles.textBoxContainer} value={lastName} onChangeText={(val) => handleChange('lastName', val)} placeholder='Last Name' />
                    <CustomTextBox keyboardType='phone-pad' value={contactNumber} onChangeText={(val) => handleChange('contactNumber', val)} placeholder='Contact Number' />
                    <CustomButton disabled={!isButtonEnabled} label='Submit' onPress={submitForm} />
                </View>
            </CustomKeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ProfileCreation;
