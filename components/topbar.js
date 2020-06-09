import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/logo-icon.png'

const Topbar = props => {

    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={e => props.navigation.toggleDrawer()}>
                <Ionicons name="md-menu" size={24} color="white" />
            </TouchableOpacity>

            <Image style={styles.logo} source={logo} />
            <Ionicons name="md-help-circle-outline" size={24} color="white" />
        </View>
    )
}

export default Topbar;

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'cover',
        width: 55,
        height: 52,
    },
    container: {
        alignSelf: 'stretch',
        position: 'relative',
        width: '100%',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: '#A53DB5',
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 7
    }
});
