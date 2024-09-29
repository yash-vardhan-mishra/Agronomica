import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './AddFarm.styles'
import Header from '../../components/molecules/Header';
import { Alert, View } from 'react-native';
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox';
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import CustomButton from '../../components/molecules/CustomButton';
import MapViewComponent, { FullScreenModalRef } from '../../components/molecules/MapViewComponent';

type AddFarmNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'AddFarm'>;

interface AddFarmProps {
    navigation: AddFarmNavigationProp;
}

const AddFarm: React.FC<AddFarmProps> = ({ navigation }) => {
    const { authToken } = useAuth();
    const [state, setState] = useState({
        fieldName: '',
        fieldLocation: '',
        fieldSize: ''
    });
    const mapView = useRef<FullScreenModalRef>(null)

    const { setLoading } = useLoading();

    const handleChange = (type: string, val: string) => {
        setState(prevVal => ({ ...prevVal, [type]: val }));
    };

    const { fieldName, fieldLocation, fieldSize } = state;

    const isButtonEnabled = fieldName && fieldLocation && fieldSize;

    const submitForm = () => {
        if (!fieldName || !fieldLocation || !fieldSize) {
            Alert.alert('Error', 'Please enter all the details');
        }
    };

    const onBackPress = () => {
        navigation.goBack()
    }

    const handleMapView = (isOpen: boolean) => {
        if (mapView.current) {
            if (isOpen) {
                mapView.current.open();
            } else {
                mapView.current.close();
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <Header title="Add Farm" isBackButtonVisible onBackPress={onBackPress} />
                <View style={styles.inputContainer}>
                    <CustomTextBox style={styles.textBoxContainer} value={fieldName} onChangeText={(val) => handleChange('fieldName', val)} placeholder='Field Name' />
                    <CustomTextBox style={styles.textBoxContainer} keyboardType='number-pad' value={fieldSize} onChangeText={(val) => handleChange('fieldSize', val)} placeholder='Field Size in Acres' />
                    <CustomTextBox style={styles.textBoxContainer} value={fieldLocation} onFocus={() => handleMapView(true)} placeholder='Field Location' />
                    <CustomButton disabled={!isButtonEnabled} label='Submit' onPress={submitForm} />
                </View>
            </CustomKeyboardAvoidingView>
            <MapViewComponent ref={mapView} />
        </SafeAreaView>
    );
};

export default AddFarm;
