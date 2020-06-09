import React, { createContext } from "react";

export const FirebaseContext = createContext({
  ob: 'lala'
});

export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
);
