import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FarmsManagement.styles';
import Header from '../../components/molecules/Header';
import { Pressable, ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import CustomText from '../../components/atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { useFields } from '../../contexts/FieldsDetailsContext';

type FarmsManagementNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'FarmsManagement'>;

interface FarmsManagementProp {
    navigation: FarmsManagementNavigationProp;
}

const FarmsManagement: React.FC<FarmsManagementProp> = ({ navigation }) => {
    const { fields, fetchFieldsData } = useFields();
    const [isFocused, setIsFocused] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const loadFields = async () => {
                if (!isFocused) {
                    await fetchFieldsData();
                    setIsFocused(true);
                }
            };

            loadFields();

            return () => {
                setIsFocused(false);
            };
        }, [fetchFieldsData]) // Depend only on fetchFieldsData
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
