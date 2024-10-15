import React, { useImperativeHandle, forwardRef, useState, useEffect, useRef } from 'react';
import { Modal, View, Pressable, Image, Alert, Linking, AppState } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import Dimensions from '../../../constants/Dimensions';
import Colors from '../../../constants/Colors';
import CustomText from '../../atoms/CustomText/CustomText';
import constants from '../../../constants';
import styles from './MapViewComponent.styles';
import Paths from '../../../constants/Paths';
import { debounce, latitudeDelta, longitudeDelta } from './MapViewComponent.helpers';
import Header from '../../molecules/Header';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export interface FullScreenModalRef {
    open: () => void;
    close: () => void;
}

export interface MapViewData {
    latitude: number;
    longitude: number;
    selectedLocation: string;
    selectedCity: string;
    selectedPostalCode: string;
}

interface Props {
    onConfirm: (data: MapViewData) => void;
}

const initialCoordinates = {
    latitude: constants.Strings.waikatoLat,
    longitude: constants.Strings.waikatoLong
}

const MapViewComponent = forwardRef<FullScreenModalRef, Props>((props, ref) => {
    const mapViewRef = useRef<MapView>(null);
    const { top } = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    const [permission, setPermission] = useState<boolean | null>(null);
    const [mapHeight, setMapHeight] = useState(0);
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const [coordinates, setCoordinates] = useState(initialCoordinates);
    const [geolocation, setGeolocation] = useState({
        selectedLocation: '',
        selectedCity: '',
        selectedPostalCode: '',
    });

    const debounceReverseGeocode = debounce((lat: number, lng: number) => reverseGeocode(lat, lng), 500);

    useImperativeHandle(ref, () => ({
        open: () => {
            if (permission) {
                setVisible(true);
            } else {
                showPermissionError();
            }
        },
        close: () => setVisible(false),
    }));

    const formatLocationToSet = (locationDetails: Location.LocationGeocodedAddress[]) => {
        return locationDetails[0].name && /[a-zA-Z]/.test(locationDetails[0].name) ? locationDetails[0].name : locationDetails[0].street || locationDetails[0].district || locationDetails[0].city || ''
    }

    const reverseGeocode = async (lat: number, long: number) => {
        try {
            const locationDetails = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: long,
            });
            console.log('locationDetails are,', { locationDetails, lat, long });
            if (locationDetails.length > 0) {
                setGeolocation({
                    // checking if the name contains at least one alphabet as lib sometimes returns only postalcode in the name
                    selectedLocation: formatLocationToSet(locationDetails),
                    selectedCity: locationDetails[0].city || '',
                    selectedPostalCode: locationDetails[0].postalCode || '',
                });
            }
        } catch (error) {
            console.log('reverseGeocode error', error);
        } finally {
            setFetchingLocation(false);
        }
    };

    const setCurrentLocation = async () => {
        try {
            const res = await Location.getCurrentPositionAsync({});
            mapViewRef.current?.animateToRegion({
                latitude: res.coords.latitude,
                longitude: res.coords.longitude,
                longitudeDelta: latitudeDelta,
                latitudeDelta: longitudeDelta
            }, 500)
        } catch (error) {
            console.log('setCurrentLocation err', { error });
        }
    }

    const getCurrentLocation = async () => {
        try {
            const res = await Location.getCurrentPositionAsync({});
            setCoordinates({
                latitude: `${res.coords.latitude}`,
                longitude: `${res.coords.longitude}`,
            });
            debounceReverseGeocode(res.coords.latitude, res.coords.longitude);
        } catch (error) {
            console.log('getCurrentLocation error,', error);
            setFetchingLocation(false);
        }
    };

    const onRegionChangeComplete = (region: Region) => {
        const { latitude, longitude } = region;
        setFetchingLocation(true);
        setCoordinates({ latitude: `${latitude}`, longitude: `${longitude}` });
        debounceReverseGeocode(latitude, longitude); // Only call after map movement completes
    };

    const showPermissionError = () =>
        Alert.alert('Error', 'Permission to access location was denied', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Open Settings',
                onPress: () => Linking.openURL('app-settings://'),
            },
        ])

    const checkPermission = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setPermission(false);
                showPermissionError();
                return;
            }
            setPermission(true);
            getCurrentLocation();
        } catch (error) {
            console.log('Permission check error', error);
        }
    };

    useEffect(() => {
        checkPermission();

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkPermission();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const onConfirm = () => {
        props.onConfirm({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            selectedLocation,
            selectedCity,
            selectedPostalCode,
        })
        closeModal()
    }

    const closeModal = () => {
        setVisible(false)
    }

    const { latitude, longitude } = coordinates;
    const { selectedLocation, selectedCity, selectedPostalCode } = geolocation;

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={{ paddingTop: top, flex: 1 }}>
                <Header title="Choose Location" onBackPress={closeModal} isBackButtonVisible />
                <View style={styles.container}>
                    <Pressable
                        style={[{
                            top: 0.5 * mapHeight - 51,
                        }, styles.locationPinContainer]}
                    >
                        <Image
                            source={Paths.images.locationPin}
                            style={styles.locationPin}
                        />
                    </Pressable>

                    <MapView
                        ref={mapViewRef}
                        onRegionChangeComplete={onRegionChangeComplete} // Only trigger after user stops moving
                        onLayout={(e) => setMapHeight(e.nativeEvent.layout.height)}
                        style={styles.map}
                        initialRegion={{
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                            latitudeDelta,
                            longitudeDelta,
                        }}
                    />

                    <View style={styles.bottomCard}>
                        <Pressable onPress={setCurrentLocation} style={styles.locationIcon}>
                            <FontAwesome6 name="location-crosshairs" size={16} color={Colors.black} />
                        </Pressable>
                        {fetchingLocation ? (
                            <View style={{ marginBottom: 12 }}>
                                <ShimmerPlaceholder
                                    style={styles.shimmerPlaceholder}
                                    width={Dimensions.SCREEN_WIDTH - 68}
                                    shimmerColors={Colors.shimmerColor}
                                />
                                <ShimmerPlaceholder
                                    style={[styles.shimmerPlaceholder, { alignSelf: 'flex-start' }]}
                                    width={Dimensions.SCREEN_WIDTH - 68}
                                    shimmerColors={Colors.shimmerColor}
                                />
                            </View>
                        ) : (
                            <>
                                <CustomText style={styles.locationTopText} size={18} weight="700">
                                    {selectedLocation}
                                </CustomText>
                                <CustomText size={12} color="#77838F" weight="400">
                                    {selectedCity}
                                </CustomText>
                                <CustomText size={12} color="#77838F" weight="400">
                                    {selectedPostalCode}
                                </CustomText>
                            </>
                        )}
                        <Pressable
                            disabled={fetchingLocation}
                            style={styles.bottomButton}
                            onPress={onConfirm}
                        >
                            <CustomText weight="700" color={Colors.white}>
                                Confirm
                            </CustomText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
});

export default MapViewComponent;