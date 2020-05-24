import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    CustomButton,
    CustomTextInputWithImg
} from "../components/CustomElements";
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';

import megafone from '../assets/images/alert-img.jpg'

const AlertContainer = props => {    
    const AlertInput = ({ label, placeholder, Icon }) => (
        <View>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <CustomTextInputWithImg
                Icon={Icon}
                placeholder={placeholder} />
        </View>
    )
    
    return (
        <View style={styles.AlertContainer}>
            <View style={styles.imgContainer}>
                <LinearGradient start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['#9724a7', '#7c24af']}
                    style={{ borderRadius: 0}, styles.imgBorder}>
                    <Image source={megafone} style={styles.img} />
                </LinearGradient>
            </View>

            <View style={styles.AlertBox}>
                <Text style={styles.AlertaTitle}>Faça um alerta.</Text>

                <View style={styles.AlertForm}>
                    <AlertInput
                        label={"Sobre o que é o alerta?"}
                        placeholder={"Assunto"}
                        Icon={({ styles }) => <SimpleLineIcons name="note" size={18} color="black" style={styles} />} />
                    <AlertInput
                        label={"Diga o que aconteceu"}
                        placeholder={"Relato"}
                        Icon={({ styles }) => <MaterialCommunityIcons name="comment-text-outline" size={20} color="black" style={styles} />}
                    />
                    <AlertInput
                        label={"GRAVIDADE"}
                        placeholder={"GRAVIDADE"}
                        Icon={({ styles }) => <EvilIcons name="location" size={26} color="black" style={styles} />}
                    />
                    <AlertInput
                        label={"Aonde aconteceu?"}
                        placeholder={"Local"}
                        Icon={({ styles }) => <EvilIcons name="location" size={26} color="black" style={styles} />}
                    />
                    <AlertInput
                        label={"DATA E HORARIO"}
                        placeholder={"DATA E HORARIO"}
                        Icon={({ styles }) => <EvilIcons name="location" size={26} color="black" style={styles} />}
                    />

                    <CustomButton
                        style={styles.AlertButton}
                        onPress={() => <></>} title="Alertar" />
                    <TouchableOpacity style={styles.BackBtn} onPress={_ => props.navigation.navigate('Home')}>
                        <Text style={styles.back}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AlertContainer;

const styles = StyleSheet.create({
    AlertContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        borderRadius: 100,
        width: 115,
        height: 112,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#A577B4'
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
    AlertTop: {
        alignItems: 'center',
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
    AlertBox: {
        justifyContent: "space-between",
    },
    AlertForm: {
        width: 240,
        // borderWidth: 1
    },
    AlertInputLabel: {
        fontSize: 12,
        fontWeight: "300",
        color: '#fff',
        marginLeft: 10,
        marginBottom: 3,
        marginTop: 6
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