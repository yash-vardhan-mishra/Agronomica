import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FarmsManagement.styles';
import Header from '../../components/molecules/Header';
import { Pressable, ScrollView, View, Alert, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import CustomText from '../../components/atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { getFields } from '../../services/fields';  // Assuming this is the path to your service
import { useAuth } from '../../contexts/AuthContext';  // Assuming you have an Auth context for the token
import { useLoading } from '../../contexts/LoadingContext';
import { showError } from '../../components/molecules/OtpTextInput/utils';

type FarmsManagementNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'FarmsManagement'>;

interface FarmsManagementProp {
    navigation: FarmsManagementNavigationProp;
}

const FarmsManagement: React.FC<FarmsManagementProp> = ({ navigation }) => {
    const { authToken } = useAuth();  // Get the auth token from the context
    const [fields, setFields] = useState<any[]>([]);
    const { setLoading } = useLoading();

    useFocusEffect(
        useCallback(() => {
            // When the screen is focused, fetch the fields
            const fetchFields = async () => {
                setLoading(true);

                try {
                    const response = await getFields(authToken);
                    console.log('response in getFields,', response);

                    setFields(response?.data || []);  // Assuming the API response has a 'fields' array
                } catch (err) {
                    showError(err)
                } finally {
                    setLoading(false);
                }
            };

            fetchFields();
        }, [authToken])  // Dependency array includes authToken to ensure it’s available
    );

    const renderFields = () => {
        if (fields.length === 0) {
            return <CustomText>No Farms exist</CustomText>;
        }

        return fields.map((field, index) => (
            <View key={index} style={styles.fieldItem}>
                <CustomText>{field.fieldName}</CustomText>
                <CustomText>{field.size} acres</CustomText>
                <CustomText>{field.fieldType}</CustomText>
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Farms Management" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    {renderFields()}
                </View>
            </ScrollView>

            <Pressable
                onPress={() => navigation.navigate('AddField')}
                style={styles.addFieldCta}>
                <CustomText size={24} color={Colors.white}>
                    +
                </CustomText>
            </Pressable>
        </SafeAreaView>
    );
};

export default FarmsManagement;
