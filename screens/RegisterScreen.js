import * as React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
    Alert
} from 'react-native';
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";
import { withFirebaseHOC } from "../config/Firebase";

const RegisterScreen = (props) => {
    const { navigation, firebase } = props;
    const [botaoRegistrarDesativado, setBotaoRegistrarDesativado] = React.useState(true)
    const [email, setEmail] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [cep, setCEP] = React.useState(null);
    const [nickname, setNickname] = React.useState(null);
    const [surname, setSurname] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [neighbor, setNeighbor] = React.useState(null);
    const [uf, setUF] = React.useState(null);
    const [number, setNumber] = React.useState(null);
    const [street, setStreet] = React.useState(null);
    const [password, setPassword] = React.useState(null);    
    const handleOnRegister = async _ => {
        try {        
            const addUser = {
                    email: email,
                    nickname: "Simo",
                    name: name,
                    surname: "Hohlenwerger",
                    customer_rating: 99,
                    phone: "16981893153",
                    cep: "13570540",
                    city: "São Carlos",
                    neighborhood: "Jd. Mercedes",
                    street: "Rua Alfeo Ambrogio",
                    number: "1138",
                    uf: "SP",
                    created_at: new Date(),
                    updated_at: new Date()
                }
        
                var firebaseAddReturn = firebase.FIREBASE
                    .firestore()
                    .collection("USER")
                    .doc('2ytPUBqF8jNjhy5aUxDdI0Qh0GO2')
                    .set(addUser)
            
        } catch (error) {
            Alert.alert('error', error.message)
            //actions.setFieldError("general", error.message);
        }
    }

    React.useEffect(_ => {
        if (name.lenght > 0 && email.length > 0 && password.length > 0) 
            setBotaoRegistrarDesativado(false)
    })

    const updateNumber = number => {
        setNumber(number)
    }

    const updateCEP = cep => {
        // \D -> Apaga tudo que NÃO for número
        let cleaned = ('' + cep).replace(/\D/g, '');
        if(cleaned.Length > 8) return;

        let match = cleaned.match(/^(\d{5})(\d{3})$/);
        if(match)
            setCEP([match[1],"-",match[2]].join(''))            
    }

    const updateUF= uf => {
        let cleaned = ('' + uf).replace(/\d/g, '');
        if(cleaned.length>2) return;

        let match = cleaned.match(/^(\D{2})$/);
        if(match)
            setUF([match[1]].join(''))             
    }

    const updateCity = city => {
        setCity(city)
    }

    const updateUsrname = usrname => {
        setUsrname(usrname)
    }

    const updatePhone = phone => {        
        //Filter only numbers from the input
        let cleaned = ('' + phone).replace(/\D/g, '');
        if(cleaned.Length > 11) return;
        //Check if the input is of correct
        let match = cleaned.match(/^(\d{2}|)?(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            //Remove the matched extension code
            //Change this to format for any country code.
            let intlCode = (match[1] ? '+55 ' : '')
            setPhone([intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')) 
        }        
    }

    const updateNeighbor = neighbor => {
        setNeighbor(neighbor)
    }

    const updateStreet = street => {
        setStreet(street)
    }

    const updateEmail = email => {
        setEmail(email)
    }

    const updatePassword = password => {
        setPassword(password)
    }

    const updateName = name => {
        setName(name)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={require('../assets/images/login-bg.png')} style={[styles.image]}>

                <CustomTextInput                    
                    onChangeText={updateName}
                    value={name}
                    textContentType="text"
                    type="text"
                    style={styles.input}
                    placeholder="Nome"
                />
                <CustomTextInput
                    onChangeText={updateUsrname}
                    value={usrname}                   
                    textContentType="last name"
                    type="text"
                    style={styles.input}
                    placeholder="Sobrenome"
                />				
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
                    style={styles.input}
                    placeholder="Senha"
                />
                <CustomTextInput
                    onChangeText={updatePhone}
                    value={phone}                    
                    textContentType="phone"
                    type="number"
                    style={styles.input}
                    placeholder="Telefone"
                />
                <CustomTextInput
                    onChangeText={updateCEP}
                    value={cep}                    
                    textContentType="cep"
                    type="number"
                    style={styles.input}
                    placeholder="CEP"
                />
                <CustomTextInput
                    onChangeText={updateUF}
                    value={uf}                   
                    textContentType="uf"
                    type="text"
                    style={styles.input}
                    placeholder="Estado"
                />
                <CustomTextInput
                    onChangeText={updateCity}
                    value={city}                   
                    textContentType="city"
                    type="text"
                    style={styles.input}
                    placeholder="Cidade"
                />
                <CustomTextInput
                    onChangeText={updateNeighbor}
                    value={neighbor}                   
                    textContentType="neighborhood"
                    type="text"
                    style={styles.input}
                    placeholder="Bairro"
                />
                <CustomTextInput
                    onChangeText={updateStreet}
                    value={street}                   
                    textContentType="street"
                    type="text"
                    style={styles.input}
                    placeholder="Rua"
                />
                <CustomTextInput
                    onChangeText={updateNumber}
                    value={number}                   
                    textContentType="number"
                    type="number"
                    style={styles.input}
                    placeholder="Número"
                />               
                <CustomButton isDisabled={botaoRegistrarDesativado}
                    onPress={() => handleOnRegister()} title="Registrar"
                    style={{...styles.input, marginTop: 25}} />
                <CustomText onPress={() => props.navigation.navigate('Links')}
                    style={styles.opcoesFinais}>
                    Preciso de ajuda
                </CustomText>                               
            </ImageBackground>

        </KeyboardAvoidingView>
    );
}

export default withFirebaseHOC(RegisterScreen)

RegisterScreen.navigationOptions = {
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