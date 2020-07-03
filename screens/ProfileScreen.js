import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Topbar from '../components/topbar';
import { withFirebaseHOC } from "../config/Firebase";
import { Ionicons, SimpleLineIcons, Entypo, MaterialCommunityIcons, MaterialIcons,Feather  } from '@expo/vector-icons';
import ProfileUserImage from '../components/ProfileUserImage';
import ProfileFormData from '../components/ProfileFormData';
import { TextInput } from 'react-native-gesture-handler';

const PreviousPage = ({ navigation, title }) => (
    <View style={styles.PreviousPage}>
        <TouchableOpacity onPress={_ => navigation.goBack()} style={styles.ButtonBox}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <Text style={styles.Title}>{title}</Text>
        </TouchableOpacity>
    </View>
)
//<ProfileFormData listLabel={parseUserData} />
const ProfileScreen = ({ navigation, firebase }) => {
    const [parseUserData, setParseUserData] = React.useState([
        firebase.user.email,
        firebase.user.phone,
        firebase.user.cep,
        firebase.user.city + '-' + firebase.user.uf,
        firebase.user.neightborhood,
        firebase.user.street + ' nº ' + firebase.user.number
    ])

    var number = firebase.user.number.toString()
    return (
        <View style={{ flex: 1, paddingTop: 0, zIndex: 5 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#8e2e9c" />
            <Topbar navigation={navigation} />
            <View style={styles.container}>
                <PreviousPage title="Perfil" navigation={navigation} />

                <View style={styles.ProfileContainer}>
                    <ProfileUserImage firebase={firebase} />
                    <View>

                        <View style={styles.linha}>
                            <View  style={styles.linhaFilho}>
                                <Entypo name="mail"  size={24} color="purple"/>
                                <Text style={styles.text}> Email: </Text>
                            </View>
                            <Text>{firebase.user.email}</Text>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Feather name="smartphone" size={22} color="purple" />
                                <Text style={styles.text}> Tel: </Text>
                            </View>
                            <TextInput style={styles.text2} placeholder={firebase.user.phone}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Entypo name="location" size={22} color="purple"></Entypo>
                                <Text style={styles.text}> CEP: </Text>
                            </View>
                            <TextInput style={styles.text2} placeholder={firebase.user.cep}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <MaterialCommunityIcons name="numeric" size={22} color="purple" />
                                <Text style={styles.text}> Nº: </Text>
                            </View>
                            <TextInput style={styles.text2} placeholder={number}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <MaterialIcons name="location-city" size={22} color="purple" />  
                                <Text style={styles.text}> NBHD: </Text>
                            </View>
                            <TextInput style={styles.text2} placeholder={firebase.user.neightborhood}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Entypo name="address" size={22} color="purple" />
                                <Text style={styles.text}> City: </Text>
                            </View>
                            <TextInput style={styles.text2} placeholder={firebase.user.city}></TextInput>
                        </View>
                        
                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Entypo name="map" size={22} color="purple" />
                                <Text style={styles.text}> UF: </Text>
                            </View>
                            <TextInput style={styles.text2} placeholder={firebase.user.uf}></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.OutBtn}>
                        <SimpleLineIcons name="logout" size={24} color="white" />
                        <Text style={styles.OutBtnTxt}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default withFirebaseHOC(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingRight: 10,
        paddingLeft: 10,
        // backgroundColor: '#F4F4FB'
    },
    ProfileContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    OutBtn: {
        flexDirection: 'row',
        backgroundColor: '#B74CAC',
        borderRadius: 20,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    OutBtnTxt: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 12
    },
    PreviousPage: {
        // borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 4,
        alignItems: 'center'
    },
    ButtonBox: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 0.4,
        borderColor: 'grey',
        paddingHorizontal: 12,
        paddingVertical: 11
    },
    Title: {
        marginHorizontal: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    linha:{
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderColor: 'grey',
        justifyContent: 'space-between',
    },
    linhaFilho:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text2:{
        marginTop: 4,
    },
    text:{
        marginTop: 4,
    }
})