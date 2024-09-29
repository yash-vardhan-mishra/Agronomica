import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './EmployeeManagement.styles';
import Header from '../../components/molecules/Header';
import { ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { useProfile } from '../../contexts/ProfileProvider';
import CustomButton from '../../components/molecules/CustomButton';
import CustomTextBoxWithTitle from '../../components/molecules/CustomTextBoxWithTitle';

type ProfileNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'EmployeeManagement'>; // Define the type for navigation

interface ProfileProps {
    navigation: ProfileNavigationProp;
}

const EmployeeManagement: React.FC<ProfileProps> = ({ navigation }) => {
    const { profile } = useProfile();
    // Provide default values if profile is null
    const firstName = profile?.firstName || '';
    const lastName = profile?.lastName || '';
    const contactNumber = profile?.contactNumber || '';
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Employee Management" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <CustomTextBoxWithTitle title='First Name' editable={false} value={firstName} />
                    <CustomTextBoxWithTitle title='Last Name' editable={false} value={lastName} />
                    <CustomTextBoxWithTitle title='Contact Number' editable={false} value={contactNumber} />
                </View>
                <CustomButton label='Log Out' onPress={() => console.log('logout')} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default EmployeeManagement;
