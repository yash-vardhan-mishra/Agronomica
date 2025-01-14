import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FarmsManagement.styles';
import Header from '../../components/molecules/Header';
import { Pressable, ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import CustomText from '../../components/atoms/CustomText/CustomText';
import { useFocusEffect } from '@react-navigation/native';
import { useFields } from '../../contexts/FieldsDetailsContext';
import Colors from '../../constants/Colors';

type FarmsManagementNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'FarmsManagement'>;

interface FarmsManagementProp {
    navigation: FarmsManagementNavigationProp;
}

const FarmsManagement: React.FC<FarmsManagementProp> = ({ navigation }) => {
    const { fields, fetchFieldsData } = useFields();
    const [isFocused, setIsFocused] = useState(false);
    console.log('fields are', fields);

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

        return fields.map((field, index) => {

            return (
                <Pressable
                    onPress={() => navigation.navigate('FarmDetails', { fieldId: field.fieldId })}
                    key={index} style={styles.fieldItem}>
                    <CustomText weight='600'>{field.fieldName}</CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomText size={12} color={Colors.romanSilver}>{field.size} acres • {field.fieldType}</CustomText>
                    </View>
                    <CustomText size={12} color={Colors.romanSilver}>{field.fieldAddress}</CustomText>
                </Pressable>
            )
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Farms Management" rightIcon='add-circle-outline' onRightIconPress={() => navigation.navigate('AddField')} />
            <ScrollView showsVerticalScrollIndicator={false} contentInset={{ bottom: 100 }} contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    {renderFields()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FarmsManagement;
