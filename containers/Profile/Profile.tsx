import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Profile.styles';
import Header from '../../components/molecules/Header';
import { ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { useProfile } from '../../contexts/ProfileProvider';
import CustomButton from '../../components/molecules/CustomButton';
import CustomTextBoxWithTitle from '../../components/molecules/CustomTextBoxWithTitle';
import { useAuth } from '../../contexts/AuthContext';

type ProfileNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'Profile'>; // Define the type for navigation

interface ProfileProps {
    navigation: ProfileNavigationProp;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const { profile } = useProfile();
    const { logout } = useAuth()
    // Provide default values if profile is null
    const firstName = profile?.firstName || '';
    const lastName = profile?.lastName || '';
    const contactNumber = profile?.contactNumber || '';
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Profile" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <CustomTextBoxWithTitle title='First Name' editable={false} value={firstName} />
                    <CustomTextBoxWithTitle title='Last Name' editable={false} value={lastName} />
                    <CustomTextBoxWithTitle title='Contact Number' editable={false} value={contactNumber} />
                </View>
            </ScrollView>
            <CustomButton style={{ marginHorizontal: 20, marginBottom: 20 }} label='Log Out' onPress={() => logout()} />
        </SafeAreaView>
    );
};

export default Profile;
