import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './EmployeeManagement.styles';
import Header from '../../components/molecules/Header';
import { ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import CustomText from '../../components/atoms/CustomText/CustomText';

type ProfileNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'EmployeeManagement'>; // Define the type for navigation

interface ProfileProps {
    navigation: ProfileNavigationProp;
}

const EmployeeManagement: React.FC<ProfileProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Employee Management" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <CustomText>
                        No employees exist
                    </CustomText>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EmployeeManagement;
