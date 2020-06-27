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
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import ProfileUserImage from '../components/ProfileUserImage';
import ProfileFormData from '../components/ProfileFormData';

const PreviousPage = ({ navigation, title }) => (
    <View style={styles.PreviousPage}>
        <TouchableOpacity onPress={_ => navigation.goBack()} style={styles.ButtonBox}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <Text style={styles.Title}>{title}</Text>
        </TouchableOpacity>
    </View>
)

const ProfileScreen = ({ navigation, firebase }) => {
    const [parseUserData, setParseUserData] = React.useState([
        firebase.user.email,
        firebase.user.phone,
        firebase.user.cep,
        firebase.user.city + '-' + firebase.user.uf,
        firebase.user.neightborhood,
        firebase.user.street + ' nº ' + firebase.user.number
    ])

    return (
        <View style={{ flex: 1, paddingTop: 0, zIndex: 5 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#8e2e9c" />
            <Topbar navigation={navigation} />
            <View style={styles.container}>
                <PreviousPage title="Perfil" navigation={navigation} />

                <View style={styles.ProfileContainer}>
                    <ProfileUserImage firebase={firebase} />
                    <ProfileFormData listLabel={parseUserData} />

                    <TouchableOpacity style={styles.OutBtn}>
                        <SimpleLineIcons name="logout" size={24} color="white" />
                        <Text style={styles.OutBtnTxt}>SAIR</Text>
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
    }
})