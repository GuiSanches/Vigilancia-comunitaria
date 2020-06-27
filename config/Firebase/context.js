import React, { createContext } from "react";
import Firebase from './firebase'

const FirebaseContext = createContext();

export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
);

export function FirebaseCtx({ setLoggedIn, ...props }) {
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
      {props.children}
    </FirebaseProvider>
  )
}

export { FirebaseContext }
