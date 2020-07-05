import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    StatusBar,
    Alert
} from 'react-native';
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";
import FeedCard from '../components/FeedCard';
import gatao from '../assets/images/gatao.jpeg'
import Topbar from '../components/topbar';
import { withFirebaseHOC } from "../config/Firebase";
const VALID_EMAIL = "";
const VALID_PASSWORD = "";

const postTemplate = {
    id: 0,
    user: {
        name: 'Marcelo Augusto',
        img: gatao
    },
    title: 'Assalto na rep Metralha',
    date: 'há 1 minuto',
    labels: ['assalto', 'animal louco', 'iluminação'],
    location: 'Saída mat',
    content: 'GENTE agora de pouco entraram na minha rep, fica na alexandrina na altura do cinema mais ou menos, a polícia conseguiu prender um e tem 2 que conseguiram fugir. Ontem foram la uma menina com um cara dizendo q ficou sabendo que precisava de vagas, que falou com uma das meninas da casa e não lembrava quem era e queria ver, sendo que não tinha e nem ngm havia falado com ela, não deixamos entrar porém não adiantou.... então tomem cuidado e não caiam nessa cilada!!'
}

const updatePosts = async (firebase) => {
    try {
        console.log("Local city: " + firebase.user.city)
        var updateOption = firebase.FIREBASE
          .firestore()
          .collection("ALERT")
          .where("city","==",firebase.user.city)
          .where("deleted","==",false)
                    
          console.log("Comando Retornado do fireBase!: "+ [...updateOption])
        
        return updateOption          
    } 
    catch (e) {
        Alert.alert(
            "Erro ao atualizar feed!",
            e.message,
            [
                { text: "Tentar novamente", 
                onPress: () => handleRefresh()},
                { text: "Fechar" }
            ],
            { cancelable: false }
        );
        throw e
        //console.log(Object)
    }
}

const data = Array.from({
    length: 20
}, _ => postTemplate)

const FeedScreen = props => {
    const { navigation, firebase, user } = props;
    const [isRefreshing, setRefreshing] = React.useState(false)
    const [posts, setPosts] = React.useState(data.slice(0, 5))

    const getProducts = async _ => {
        console.log("props.firebase.user.city: "+firebase.user.city)
        if (posts.length < 30) {
            setRefreshing(true)
            var newPosts = await updatePosts(firebase)
            setPosts([...posts,...newPosts]) // setPosts([...post, ...ret])
            setRefreshing(false)
        }
    }

    const handleRefresh = async _ => {
        console.log("props.firebase.user.city: "+firebase.user.city)
        setRefreshing(true)
        var newPosts = await updatePosts(firebase)
        setPosts([...newPosts]) // setPosts([...post, ...ret])
        setRefreshing(false)
    }

    return (
        <View style={{ flex: 1, paddingTop: 0, zIndex: 5 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#8e2e9c" />
            <Topbar navigation={navigation} handleRefresh={handleRefresh} />
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <FeedCard postData={item} />}
                    keyExtractor={item => `post-${item.id + Math.random() * 8}`}
                    onEndReached={getProducts}
                    onRefresh={handleRefresh}
                    refreshing={isRefreshing}
                />
            </View>


        </View>
    )
}

export default withFirebaseHOC(FeedScreen)

/* LoginScreen.navigationOptions = {
    header: null,
}; */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#F4F4FB'
    },
    feedBox: {
        flex: 1,
        backgroundColor: '#F4F4FB'
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