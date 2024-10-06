import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import Header from '../../components/molecules/Header';
import CustomTextBoxWithTitle from '../../components/molecules/CustomTextBoxWithTitle';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useFields } from '../../contexts/FieldsDetailsContext';
import { AuthStackParamList } from '../../navigation/AuthStack';
import styles from './FarmDetails.styles';
import MapView, { Marker } from 'react-native-maps';
import constants from '../../constants';

type FarmDetailsRouteProp = RouteProp<AuthStackParamList, 'FarmDetails'>;

const FarmDetails: React.FC = () => {
    const route = useRoute<FarmDetailsRouteProp>();
    const { fieldId } = route.params; // Field ID passed from FarmsManagement
    const { fields } = useFields();
    const navigation = useNavigation()
    const [field, setField] = useState<any>(null);

    useEffect(() => {
        const selectedField = fields.find(f => f.fieldId === fieldId);
        setField(selectedField);
    }, [fieldId, fields]);

    if (!field) {
        return null; // Return null if no field is found or data is loading
    }

    const { fieldName, size, fieldType, fieldLat, fieldLong } = field;

    const region = {
        latitude: fieldLat || constants.Strings.waikatoLat,  // Provide default coordinates if fieldLat is null
        longitude: fieldLong || constants.Strings.waikatoLong,  // Provide default coordinates if fieldLong is null
        latitudeDelta: 0.1, // Zoom level for the map
        longitudeDelta: 0.1,
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header isBackButtonVisible onBackPress={() => navigation.goBack()} title="Farm Details" />
            <ScrollView contentContainerStyle={styles.detailsContainer}>
                <CustomTextBoxWithTitle title="Farm Name" value={fieldName} editable={false} />
                <CustomTextBoxWithTitle title="Size (Acres)" value={size?.toString()} editable={false} />
                <CustomTextBoxWithTitle title="Field Type" value={fieldType} editable={false} />
                {/* MapView to show the location */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={region}
                        pointerEvents="none" // Disable interaction on the map
                    >
                        <Marker
                            coordinate={{ latitude: fieldLat, longitude: fieldLong }}
                            title={fieldName}
                            description={`Type: ${fieldType}`}
                        />
                    </MapView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FarmDetails;
