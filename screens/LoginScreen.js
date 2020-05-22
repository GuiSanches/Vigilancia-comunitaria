import * as React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    ToastAndroid,
    ImageBackground,
    AsyncStorage,
    Button
} from 'react-native';
import * as theme from "../constants/Theme.js";
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";
import { withFirebaseHOC } from "../config/Firebase";
import * as AppAuth from 'expo-app-auth';

const VALID_EMAIL = "";
const VALID_PASSWORD = "";
const LoginScreen = (props) => {
    const { navigation, firebase } = props;

    const verificar = () => {
        if (email != '') {
            <Navigator />
        }
        else {
            Alert.alert('erro')
        }
    }

    const [email, setEmail] = React.useState(VALID_EMAIL);
    const [password, setPassword] = React.useState(VALID_PASSWORD);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [botaoLogarDesativado, setBotaoLogarDesativado] = React.useState(true)
    const [authState, setAuthState] = React.useState(null);
    // const { signIn } = React.useContext(AuthCtx)

    const handleOnLogin = async _ => {
        try {
            await firebase.loginWithGoogle();
            // consol.log(response)
            // const response = await firebase.loginWithEmail(email, password);


            // if (response.user) {
            //     navigation.navigate("Home");
            // }
        } catch (error) {
            Alert.alert('error', error)
            //actions.setFieldError("general", error.message);
        } finally {
            Alert.alert('submit')
            // actions.setSubmitting(false);
        }
    }

    const GoogleT = async _ => {
        const { type, accessToken, user } = await Google.logInAsync({
            webClientId: '436696195305-21vpjk41ncuf62aso7r8rr1kvj52dco8.apps.googleusercontent.com'
        });

        if (type === 'success') {
            // Then you can use the Google REST API
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        }
    }

    React.useEffect(_ => {
        if (email.length > 0 && password.length > 0) setBotaoLogarDesativado(false)
    })

    const updateEmail = email => {
        setEmail(email)
    }

    const updatePassword = password => {
        setPassword(password)
    }

    const logar = props => {
        ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
        props.navigation.navigate('Home')
    }

    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={require('../assets/images/login-bg.png')} style={[styles.image]}>

                <CustomTextInput
                    onChangeText={updateEmail}
                    value={email}
                    textContentType="emailAddress"
                    type="emailAddress"
                    style={styles.input}
                    placeholder="Email"
                />
                <CustomTextInput
                    onChangeText={updatePassword}
                    value={password}
                    secureTextEntry={true}
                    textContentType="password"
                    type="password"
                    style={{ ...styles.input, marginBottom: 25 }}
                    placeholder="Senha"
                />
                <CustomButton isDisabled={botaoLogarDesativado}
                    onPress={() => handleOnLogin()} title="Entrar" />
                <CustomText onPress={() => props.navigation.navigate('Links')}
                    style={styles.opcoesFinais}>
                    Esqueceu a senha?
                </CustomText>
                <CustomText onPress={() => props.navigation.navigate('Links')}
                    style={styles.opcoesFinais}>
                    Criar uma nova conta
                </CustomText>
                <Button
                    title="Sign In with Google "
                    onPress={async () => {
                        const _authState = await signInAsync();
                        setAuthState(_authState);
                    }}
                />
            </ImageBackground>

        </KeyboardAvoidingView>
    );
}

export default withFirebaseHOC(LoginScreen)

LoginScreen.navigationOptions = {
    header: null,
};

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
    imageBg: {
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