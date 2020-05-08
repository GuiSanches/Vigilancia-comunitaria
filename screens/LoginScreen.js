import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Button,
    TouchableOpacity,
    View,
    ToastAndroid,
    ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import * as theme from "../constants/Theme.js";
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";

import { MonoText } from '../components/StyledText';

const VALID_EMAIL = "";
const VALID_PASSWORD = "";

const LoginScreen = props => {
    const { navigation } = props;

    const [email, setEmail] = React.useState(VALID_EMAIL);
    const [password, setPassword] = React.useState(VALID_PASSWORD);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [botaoLogarDesativado, setBotaoLogarDesativado] = React.useState(false)
    // const { signIn } = React.useContext(AuthCtx)

    const handleLogin = _ => {
        const errors = [];

        Keyboard.dismiss();
        setLoading(true);

        // check with backend API, or some static data
        if (email !== VALID_EMAIL) errors.push("email");
        if (password !== VALID_PASSWORD) errors.push("password");

        setErrors(errors)
        setLoading(false)
    }

    const logar = props => {
        ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
        props.navigation.navigate('Home')
    }

    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    console.log(CustomText)
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={require('../assets/logo/comidas.png')} style={[styles.image]}>

                <CustomTextInput
                    onChangeText={text => setEmail(text)}
                    value={email}
                    textContentType="emailAddress"
                    type="emailAddress"
                    style={styles.input}
                    placeholder="Email"
                />
                <CustomTextInput
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    textContentType="password"
                    type="password"
                    style={{ ...styles.input, marginBottom: 25 }}
                    placeholder="Senha"
                />
                <CustomButton disabled={botaoLogarDesativado}
                    onPress={() => logar(props)} title="Entrar" />
                <CustomText onPress={() => props.navigation.navigate('Links')}
                    style={styles.opcoesFinais}>
                    Esqueceu a senha?
                </CustomText>
                <CustomText onPress={() => props.navigation.navigate('Links')} 
                style={styles.opcoesFinais}>
                    Criar uma nova conta
                </CustomText>
            </ImageBackground>
            {/* <View style={styles.logo_container}>
                <Image style={styles.comidas} source={require('../assets/logo/comidas.png')} />
            </View> */}

        </KeyboardAvoidingView>
    );
}

export default LoginScreen

LoginScreen.navigationOptions = {
    header: null,
};

function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                You are not in development mode: your app will run at full speed.
            </Text>
        );
    }
}

function handleLearnMorePress() {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        padding: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
    },
    logo_container: {
        flex: 1,
        position: 'absolute',
        top: '35%',
        zIndex: 5,
        width: '100%',
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        borderLeftColor: 'green',
        borderLeftWidth: 1,
        borderRightColor: 'green',
        borderRightWidth: 1,
        alignSelf: 'center',
    },
    title: {
        width: '100%',
        fontSize: 32,
        marginTop: 15
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 11,
        color: 'grey'
    },
    input: {
        padding: 13,
        paddingLeft: 25,
        marginBottom: 5,
        alignSelf: 'center',
        marginTop: 15,
    },
    comidas: {
        width: '100%',
        height: 70,
        resizeMode: "cover",
        justifyContent: 'flex-end',
        justifyContent: 'center',
    },
    opcoesFinais: {
        color: 'grey',
        textAlign: 'center',
        width: '100%',
        fontSize: 14,
        marginTop: 25
    }
})