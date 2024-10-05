import React, { useImperativeHandle, forwardRef, useState, useEffect, useRef } from 'react';
import { Modal, View, Pressable, Image, StyleSheet, Alert } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Header from './Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dimensions from '../../constants/Dimensions';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import CustomText from '../atoms/CustomText/CustomText';
import { debounce } from './OtpTextInput/utils';
import constants from '../../constants';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const shimmerColor = ['#f7f7f7', '#f0f0f0', '#f7f7f7'];

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

const latitudeDelta = 0.0922
const longitudeDelta = 0.0421

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
  const [lastLocation, setLastLocation] = useState({ latitude: 0, longitude: 0 }); // Track last geocoded location
  const [geolocation, setGeolocation] = useState({
    selectedLocation: '',
    selectedCity: '',
    selectedPostalCode: '',
  });

  const debounceReverseGeocode = debounce((lat: number, lng: number) => reverseGeocode(lat, lng), 500);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const reverseGeocode = async (lat: number, long: number) => {
    if (lat === lastLocation.latitude && long === lastLocation.longitude) {
      setFetchingLocation(false);
      return; // Prevent reverse geocoding for the same location
    }
    try {
      const locationDetails = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: long,
      });
      console.log('locationDetails are,', { locationDetails, lat, long });
      // checking if the name contains at least one alphabet as lib sometimes only postalcode in the name
      if (locationDetails.length > 0) {
        setGeolocation({
          selectedLocation: locationDetails[0].name && /[a-zA-Z]/.test(locationDetails[0].name) ? locationDetails[0].name : locationDetails[0].street || locationDetails[0].district || locationDetails[0].city || '',
          selectedCity: locationDetails[0].city || '',
          selectedPostalCode: locationDetails[0].postalCode || '',
        });
        setLastLocation({ latitude: lat, longitude: long }); // Update the last geocoded location
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
        longitudeDelta,
        latitudeDelta
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

  useEffect(() => {
    (async () => {
      setFetchingLocation(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setPermission(false);
          Alert.alert('Error', 'Permission to access location was denied');
          setFetchingLocation(false);
          return;
        }
        setPermission(true);
        await getCurrentLocation();
      } catch (error) {
        console.log('Permission request error', error);
        setFetchingLocation(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (permission === false) {
      setVisible(false);
    }
  }, [permission]);

  const { latitude, longitude } = coordinates;
  const { selectedLocation, selectedCity, selectedPostalCode } = geolocation;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={{ paddingTop: top, flex: 1 }}>
        <Header title="Choose Location" onBackPress={() => setVisible(false)} isBackButtonVisible />
        <View style={styles.container}>
          <Pressable
            style={{
              position: 'absolute',
              left: 0.5 * Dimensions.SCREEN_WIDTH - 18,
              zIndex: 10,
              top: 0.5 * mapHeight - 51,
            }}
          >
            <Image
              source={require('../../assets/images/locationPin.png')}
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
                  shimmerColors={shimmerColor}
                />
                <ShimmerPlaceholder
                  style={[styles.shimmerPlaceholder, { alignSelf: 'flex-start' }]}
                  width={Dimensions.SCREEN_WIDTH - 68}
                  shimmerColors={shimmerColor}
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
              onPress={() => {
                props.onConfirm({
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                  selectedLocation,
                  selectedCity,
                  selectedPostalCode,
                })
                setVisible(false)
              }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    position: 'absolute',
    borderRadius: 12,
    backgroundColor: Colors.white,
    left: 16,
    right: 16,
    bottom: 16,
    padding: 16,
  },
  locationIcon: {
    position: 'absolute',
    right: 0,
    top: -52,
    height: 32,
    width: 32,
    backgroundColor: Colors.white,
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmerPlaceholder: {
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    marginTop: 16,
  },
  bottomButton: {
    borderRadius: 12,
    backgroundColor: Colors.amber,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 8,
  },
  locationPin: {
    height: 51,
    width: 36,
    zIndex: 10,
  },
  locationTopText: { marginBottom: 4 }
});

export default MapViewComponent;