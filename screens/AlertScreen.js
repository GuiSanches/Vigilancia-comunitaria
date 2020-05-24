import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import Topbar from '../components/topbar';
import { withFirebaseHOC } from "../config/Firebase";
import { LinearGradient } from 'expo-linear-gradient';
import AlertBox from '../components/AlertBox'

const AlertScreen = props => {
    const { navigation, firebase } = props;

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
                <AlertBox {...props} />
            </View>
        </View>
    )


}
export default withFirebaseHOC(AlertScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#7e298b',
    },
})