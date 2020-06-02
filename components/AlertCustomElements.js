import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Picker
} from 'react-native';
import {
    CustomButton,
    CustomTextInputWithImg,
    CustomAreaInputWithImg
} from "./CustomElements";
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, MaterialCommunityIcons, EvilIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import megafone from '../assets/images/alert-img.jpg'
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export const AlertInput = ({ label, placeholder, Icon, setContent }) => {
    return (
        <View>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <CustomTextInputWithImg
                Icon={Icon}
                placeholder={placeholder}
                setContent={setContent} />
        </View>
    )
}

export const AlertAreaInput = ({ label, placeholder, Icon }) => {
    return (
        <View>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <CustomAreaInputWithImg
                Icon={Icon}
                placeholder={placeholder} />
        </View>
    )
}

export const AlertRoundImg = props => (
    <View style={styles.imgContainer}>
        <LinearGradient start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['#9724a7', '#7c24af']}
            style={{ borderRadius: 0 }, styles.imgBorder}>
            <Image source={megafone} style={styles.img} />
        </LinearGradient>
    </View>
)

export const AlertStatusForm = ({ PagesLen, currPage }) => {
    const generateCurrPage = (PagesLen, currIdx) => {
        const CirclesMark = []
        const circleRadius = 15
        for (let i = 0; i < PagesLen; i++) {
            let element = (
                <View style={[styles.AlertCircle, { width: circleRadius, height: circleRadius }]}></View>
            )
        }
    }
    return (
        <View style={styles.AlertCirclesBox}>
            <Text style={styles.Teste}>{currPage}</Text>
            {/* {generateCurrPage(PagesLen, currPage)} */}
        </View>
    )
}

export const AlertDropdown = ({ arrElements, label }) => {
    const [curr, setCurr] = React.useState(arrElements[0])
    return (
        <View>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <View style={styles.AlertDropdownBox}>
                <View style={styles.AlertDropdownIcon}>
                    <Feather name="alert-triangle" size={21} color="#40386F" />
                </View>

                <Picker
                    selectedValue={curr}
                    style={styles.AlertDropdown}
                    onValueChange={(itemValue, itemIndex) => setCurr(itemValue)}>
                    {arrElements.map(label => (
                        <Picker.Item key={label} label={label} value={label} />
                    ))}
                </Picker>
                <AntDesign name="down" size={24} color="black" />
            </View>
        </View>
    )
}

export const AlertMap = ({ location }) => {
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

const styles = StyleSheet.create({
    imgContainer: {
        borderRadius: 100,
        width: 115,
        height: 112,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#A577B4',
        marginBottom: 25
    },
    imgBorder: {
        borderRadius: 100,
        width: 107,
        height: 106,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#A577B4'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 10
    },
    AlertInputLabel: {
        fontSize: 12,
        fontWeight: "300",
        color: '#fff',
        marginLeft: 10,
        marginBottom: 3,
        marginTop: 6
    },
    back: {
        color: 'white',
        textAlign: 'center',
    },
    AlertCirclesBox: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        borderWidth: 2
    },
    AlertCircle: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    AlertDropdownBox: {
        backgroundColor: '#A577B4',
        flexDirection: 'row',
        width: 240,
        height: 35,
        alignItems: 'center',
        paddingLeft: 17,
        borderRadius: 100,
    },
    AlertDropdownIcon: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 25,
        height: 25,
        alignItems: 'center'
    },
    AlertDropdown: {
        backgroundColor: '#A577B4',
        color: 'white',
        width: 160,
        borderWidth: 1,
        borderRadius: 100,
        height: 30
    },
    AlertItem: {
        borderRadius: 100,
        height: 300,
    },
    Teste: {
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    }
})