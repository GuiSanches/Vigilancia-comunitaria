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

export const AlertStatusForm = ({ PagesLen, currPage, navigate }) => {
    const idx = parseInt(currPage.slice(-1)) - 1

    const generateCurrPage = (PagesLen, currIdx) => {
        const circleRadius = 15
        const elementsArr = []
        for (let i = 0; i < PagesLen; i++) {
            let element = (
                <TouchableOpacity
                onPress={_ => navigate(`Alert-${i + 1}`)}
                    key={`Alert-${i}`}
                    style={[styles.AlertCircle,
                    { width: circleRadius, height: circleRadius },
                    idx == i && { backgroundColor: 'white' }]}></TouchableOpacity>
            )
            elementsArr.push(element)
        }

        return (
            <View style={styles.AlertPageStatus}>
                {elementsArr}
            </View>
        )
    }
    return (
        <View style={styles.AlertCirclesBox}>
            {generateCurrPage(PagesLen, idx)}
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
    AlertPageStatus: {
        flexDirection: 'row'
    },
    AlertCirclesBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
    },
    AlertCircle: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 2
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