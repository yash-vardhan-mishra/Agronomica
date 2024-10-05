import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './AddField.styles';
import Header from '../../components/molecules/Header';
import CustomTextBox from '../../components/atoms/CustomText/CustomTextBox';
import CustomKeyboardAvoidingView from '../../components/molecules/CustomKeyboardAvoidingView';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import { AuthStackParamList } from '../../navigation/AuthStack';
import CustomButton from '../../components/molecules/CustomButton';
import MapViewComponent, { FullScreenModalRef, MapViewData } from '../../components/molecules/MapViewComponent';
import { addField, getFieldTypes } from '../../services/fields';
import Colors from '../../constants/Colors';
import CustomText from '../../components/atoms/CustomText/CustomText';
import constants from '../../constants';
import { showError } from '../../components/molecules/OtpTextInput/utils';

type AddFieldNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'AddField'>;

interface AddFieldProps {
    navigation: AddFieldNavigationProp;
}

const AddField: React.FC<AddFieldProps> = ({ navigation }) => {
    const { authToken } = useAuth();
    const [state, setState] = useState({
        fieldName: '',
        fieldLocation: '',
        fieldSize: '',
        fieldTypes: [],
        selectedFieldType: '',
        latitude: constants.Strings.waikatoLat,
        longitude: constants.Strings.waikatoLong
    });
    const mapView = useRef<FullScreenModalRef>(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        getFieldTypes(authToken).then(res => {
            console.log('getFieldTypes res', res);
            if (Array.isArray(res.fieldTypes) && res.fieldTypes?.length) {
                const formattedFieldTypes = res.fieldTypes.map((item: any) => ({
                    label: item.fieldType,
                    value: item.typeId
                }));
                setState(val => ({ ...val, fieldTypes: formattedFieldTypes }));
            }
        }).catch(err => showError(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleChange = (type: string, val: string) => {
        if (type === 'fieldSize') {
            const regex = /^[0-9]*\.?[0-9]*$/;
            if (regex.test(val)) {
                if (val === '.' || (val.includes('.') && val.split('.')[1].length > 2)) {
                    return;
                }
                setState(prevVal => ({ ...prevVal, [type]: val }));
            }
        } else {
            setState(prevVal => ({ ...prevVal, [type]: val }));
        }
    };

    const { fieldName, fieldLocation, fieldSize, fieldTypes, selectedFieldType, latitude, longitude } = state;

    const isButtonEnabled = fieldName && fieldLocation && fieldSize && selectedFieldType;

    const submitForm = async () => {
        if (!fieldName || !fieldLocation || !fieldSize || !selectedFieldType || !latitude || !longitude) {
            Alert.alert('Error', 'Please enter all the details');
            return;
        }
        const requestBody = {
            fieldName,
            fieldAddress: fieldLocation,
            size: parseFloat(fieldSize),
            fieldTypeId: selectedFieldType,
            fieldLat: parseFloat(latitude),
            fieldLong: parseFloat(longitude)
        };

        try {
            setLoading(true); // Show loading state
            const response = await addField(authToken, requestBody);
            Alert.alert('Success', 'Field added successfully!');
            navigation.goBack();  // Navigate back or to a success screen if needed
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                Alert.alert('Error', error.response.data.error);
            } else {
                Alert.alert('Error', 'There was an error adding the field. Please try again.');
            }
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    const formatFieldSize = () => {
        setState(val => ({
            ...val,
            fieldSize: val.fieldSize ? parseFloat(val.fieldSize).toFixed(2) : ''
        }));
    };

    const onBackPress = () => {
        navigation.goBack();
    };

    const handleMapView = (isOpen: boolean) => {
        if (mapView.current) {
            if (isOpen) {
                mapView.current.open();
            } else {
                mapView.current.close();
            }
        }
    };

    const setLocation = (data: MapViewData) => {
        setState(val => ({
            ...val,
            fieldLocation: `${data.selectedLocation}, ${data.selectedCity}-${data.selectedPostalCode}`,
            latitude: `${data.latitude}`,
            longitude: `${data.longitude}`
        }));
    };

    const handleFieldTypeChange = (value: string) => {
        setState(val => ({
            ...val,
            selectedFieldType: value
        }));
    };

    // Custom renderItem with an icon on the right
    const renderDropdownItem = (item: any) => {
        console.log('renderDropdownItem is', item);
        let iconName = 'wheat-awn'
        switch (item.label) {
            case 'Farm':
                iconName = 'wheat-awn'
                break;
            case 'Orchard':
                iconName = 'apple-whole'
                break;
            case 'Pasture':
                iconName = 'cow'
                break;

            default:
                break;
        }
        return (
            <View style={styles.dropdownItemContainer}>
                <CustomText color={Colors.romanSilver} weight='500' size={14}>{item.label}</CustomText>
                <FontAwesome6 color={Colors.romanSilver2} name={iconName} size={18} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomKeyboardAvoidingView>
                <Header title="Add Field" isBackButtonVisible onBackPress={onBackPress} />
                <View style={styles.inputContainer}>
                    <CustomTextBox style={styles.textBoxContainer} value={fieldName} onChangeText={(val) => handleChange('fieldName', val)} placeholder='Field Name' />
                    <CustomTextBox style={styles.textBoxContainer} keyboardType='number-pad' value={fieldSize} onBlur={formatFieldSize} onChangeText={(val) => handleChange('fieldSize', val)} placeholder='Field Size in Acres' />
                    <CustomTextBox numberOfLines={2} style={styles.textBoxContainer} value={fieldLocation} onFocus={() => handleMapView(true)} placeholder='Field Location' />

                    {/* Dropdown for Field Type */}
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            containerStyle={{ borderRadius: 8 }}
                            selectedTextStyle={styles.dropdownTextStyle}
                            itemTextStyle={styles.dropdownTextStyle}
                            placeholderStyle={styles.dropdownPlaceholderStyle}
                            style={styles.dropdown}
                            data={fieldTypes}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Field Type"
                            value={selectedFieldType}
                            renderItem={renderDropdownItem}  // Custom renderItem
                            onChange={item => handleFieldTypeChange(item.value)}
                        />
                    </View>

                    {/* Submit Button */}
                    <CustomButton label='Submit' onPress={submitForm} />
                </View>
            </CustomKeyboardAvoidingView>
            <MapViewComponent ref={mapView} onConfirm={setLocation} />
        </SafeAreaView>
    );
}; 

export default AddField;
