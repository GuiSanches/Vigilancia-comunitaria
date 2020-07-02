import React, { createContext } from "react";
import { AsyncStorage } from 'react-native'
import Firebase from './firebase'

const FirebaseContext = createContext();

const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = FirebaseContext.Provider;

const FirebaseProviderComponent = ({ setLoggedIn, children }) => {
  const [token, setToken_] = React.useState()
  const [user, setUser] = React.useState({})

  const setToken = token => {
    setLoggedIn(true)
    console.log(token)
    Firebase.getUserData(token)
      .then(doc => {
        console.log(doc.data())
        if (doc.exists) {
          let user = doc.data()
          setUser(user)
          setToken_(token)
          AsyncStorage.setItem('user', JSON.stringify(user))
          AsyncStorage.setItem('token', token)
          console.log('foi')
        } else {
          // * error / not found *
        }
      })
  }

  const getUserDataStorage = async _ => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        console.log('token', token)
        const user = await AsyncStorage.getItem('user')
        setToken_(token)
        setUser(JSON.parse(user))
        setLoggedIn(true)
      }
      console.log(token)
    } catch (e) {
      console.log('erro', e.message)
    }

  }

  React.useEffect(_ => {
    getUserDataStorage()
  }, [])

  React.useEffect(_ => {
    // console.log(token, user)
  }, [token, user])
  return (
    <FirebaseProvider value={{
      ...Firebase,
      token,
      setToken,
      user,
      setUser,
    }}>
      {children}
    </FirebaseProvider>
  )
}

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
);

export { FirebaseProviderComponent as FirebaseProvider }