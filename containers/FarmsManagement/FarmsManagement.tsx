import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './FarmsManagement.styles';
import Header from '../../components/molecules/Header';
import { Pressable, ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import CustomText from '../../components/atoms/CustomText/CustomText';
import Colors from '../../constants/Colors';

type FarmsManagementNavigationProp = NativeStackNavigationProp<HomeTabParamList, 'FarmsManagement'>;

interface FarmsManagementProp {
    navigation: FarmsManagementNavigationProp;
}

const FarmsManagement: React.FC<FarmsManagementProp> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Farms Management" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <View style={styles.inputContainer}>
                    <CustomText>
                        No Farms exist
                    </CustomText>
                </View>
            </ScrollView>
            <Pressable onPress={()=>navigation.navigate('AddFarm')} style={{ borderRadius: 180, backgroundColor: Colors.amber, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, bottom: 20, height: 52, width: 52 }}>
                <CustomText size={24} color={Colors.white}>
                    +
                </CustomText>
            </Pressable>
        </SafeAreaView>
    );
};

export default FarmsManagement;
