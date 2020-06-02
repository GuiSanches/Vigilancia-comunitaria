import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Picker
} from 'react-native';
import Topbar from '../components/topbar';
import { withFirebaseHOC } from "../config/Firebase";
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';

import {
    AlertRoundImg,
    AlertInput,
    AlertAreaInput,
    AlertStatusForm,
    AlertDropdown,
    AlertMap
} from '../components/AlertCustomElements'

import {
    CustomButton,
    CustomTextInputWithImg,
    CustomAreaInputWithImg
} from "../components/CustomElements";

import * as Location from 'expo-location';

const AlertLayoutScreen = props => {
    const { children } = props
    const { props: { navigation, route: { name } } } = children
    return (
        <View style={{ flex: 1, paddingTop: 0 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#8e2e9c" />
            <Topbar />
            <View style={styles.container}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: '100%'
                    }}
                />
                {children}
                <AlertStatusForm PagesLen={3} currPage={name} />
                <TouchableOpacity style={styles.BackBtn} onPress={_ => navigation.navigate('Home')}>
                    <Text style={styles.back}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Page1 = props => {
    const { navigation, firebase, children } = props;
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const idx = parseInt(props.route.name.slice(-1)) + 1
    React.useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      });
    return (
        <View style={styles.AlertContainer}>
            <AlertRoundImg />

            <View style={styles.AlertBox}>
                <Text style={styles.AlertaTitle}>Faça um alerta.</Text>

                <View style={styles.AlertForm}>
                    <AlertInput
                        label={"Sobre o que é o alerta?"}
                        placeholder={"Assunto"}
                        Icon={({ styles }) => <SimpleLineIcons name="note" size={18} color="#40386F" style={styles} />} />
                    <AlertAreaInput
                        label={"Diga o que aconteceu"}
                        placeholder={"Relato"}
                        Icon={({ styles }) => <MaterialCommunityIcons name="comment-text-outline" size={20} color="black" style={styles} />}
                    />

                    <CustomButton
                        style={styles.AlertButton}
                        onPress={_ => props.navigation.navigate(`Alert-${idx}`, {location})} title="Próximo" />
                </View>
            </View>
        </View>
    )
}

const Page2 = props => {
    const [language, setLanguage] = React.useState('Portuguese')
    const [location, setLocation] = React.useState(props.route.params.location)

    return (
        <View style={styles.AlertContainer}>
            <View style={styles.AlertBox}>

                <View style={styles.AlertForm}>
                    <AlertDropdown label={"Selecione a gravidade do ocorrido"} arrElements={['Alta', 'Média', 'Baixa', 'Muito Baixa']} />

                    <AlertMap location={location}/>

                    <CustomButton
                        style={styles.AlertButton}
                        onPress={_ => props.navigation.navigate(`Alert-${idx}`)} title="Próximo" />
                </View>
            </View>
        </View>
    )
}



const AlertPage1 = props => {
    return (
        <AlertLayoutScreen>
            <Page1 {...props} />
        </AlertLayoutScreen>
    )
}

const AlertPage2 = props => {
    return (
        <AlertLayoutScreen>
            <Page2 {...props} />
        </AlertLayoutScreen>
    )
}

export const Alert1 = withFirebaseHOC(AlertPage1)

export const Alert2 = withFirebaseHOC(AlertPage2)

export const AlertScreen = withFirebaseHOC(AlertLayoutScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#7e298b',
    },
    AlertContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AlertBox: {
        justifyContent: "space-between",
    },
    AlertaTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'serif',
        textAlign: 'left',
        marginTop: 9,
        marginBottom: 15,
        marginLeft: 10
    },
    AlertForm: {
        width: 240,
    },
    AlertButton: {
        marginTop: 17,
        width: 240,
    },
    BackBtn: {
        marginTop: 12,
        alignSelf: 'center'
    },
    back: {
        color: 'white',
        textAlign: 'center',
    }
})