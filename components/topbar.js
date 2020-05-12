import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    Image,
} from 'react-native';
import logo from '../assets/images/logo-icon.png'

const Topbar = props => {

    return (
        <View style={styles.container}>
            <Text>Left</Text>
            <Image style={styles.logo} source={logo}/>
            <Text>Right</Text>
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
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 7
    }
});
