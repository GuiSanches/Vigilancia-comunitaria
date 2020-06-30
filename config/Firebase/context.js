import React, { createContext } from "react";
import Firebase from './firebase'

const FirebaseContext = createContext();

const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = FirebaseContext.Provider;

const FirebaseProviderComponent = ({ setLoggedIn, children }) => {
  const [token, setToken_] = React.useState()
  const [user, setUser] = React.useState({})

  const setToken = token => {
    setLoggedIn(true)
    Firebase.getUserData(token)
      .then(doc => {
        if (doc.exists) {
          let user = doc.data()
          setUser(user)
          setToken_(token)
        } else {
          // * error / not found *
        }
      })
  }
  React.useEffect(_ => {
    console.log(token, user)
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