import React, { createContext } from "react";
import Firebase from './firebase'

const FirebaseContext = createContext();

const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = FirebaseContext.Provider;

const FirebaseProviderComponent = ({ setLoggedIn, children }) => {
  const [data, setData] = React.useState()
  const [user, setUser] = React.useState({})
  const [logged, setLogged_] = React.useState(false)

  const setLogged = bool => {
    setLogged_(bool)
    setLoggedIn(bool)
  }
  return (
    <FirebaseProvider value={{
      ...Firebase,
      data,
      setData,
      user,
      setUser,
      logged,
      setLogged
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