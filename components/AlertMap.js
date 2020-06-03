import * as React from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import {View} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import {AlertInput} from '../components/AlertCustomElements'

const AlertMap = ({ location }) => {
    const [location_, setLocation] = React.useState(null)
    const [mapRegion, setMapRegion] = React.useState(null)
    const [marker, setMarker] = React.useState(null)
    const [street, setStreet] = React.useState()

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            let l = await Location.getCurrentPositionAsync({});
            setLocation(l);
        })()
    }, [location]);

    React.useEffect(() => {
        if (location_ != null && mapRegion == null) {
            setMapRegion({
                latitude: location_.coords.latitude,
                longitude: location_.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })

            setMarker({
                latlng: {
                    latitude: location_.coords.latitude,
                    longitude: location_.coords.longitude,
                },
                title: 'Posição atentado',
                description: 'proximo a'
            })
        }
    }, [location_])

    const handleMapRegionChange = mapRegion => {
        setMapRegion(mapRegion)
    }

    const handleMarkerAsync = async address => {
        let arrAddress = await Location.geocodeAsync(address)
        if (arrAddress.length > 0) {
            setMapRegion({
                latitude: arrAddress[0].latitude,
                longitude: arrAddress[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })

            setMarker({
                latlng: {
                    latitude: arrAddress[0].latitude,
                    longitude: arrAddress[0].longitude,
                },
                title: 'Posição atentado',
                description: 'proximo a'
            })
        }

    }

    const updateMarker = street => {
        setStreet(street)
        handleMarkerAsync(street)
    }

    return (
        <View>
            <AlertInput
                label={"Aonde aconteceu?"}
                placeholder={"Local"}
                setContent={updateMarker}
                Icon={({ styles }) => <Entypo name="location-pin" size={24} color="black" style={styles} />} />
            {mapRegion != null && (
                <View style={{ borderRadius: 50, borderWidth: 2, overflow: 'hidden', marginTop: 4 }}>
                    <MapView
                        style={{ alignSelf: 'stretch', height: 260 }}
                        customMapStyle={[{ borderRadius: 0 }]}
                        region={mapRegion}
                        onRegionChangeComplete={handleMapRegionChange}
                    >
                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    </MapView>
                </View>)}
        </View>
    )
}

export default AlertMap