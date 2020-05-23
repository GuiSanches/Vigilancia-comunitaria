import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';

import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import GoogleAuth from './firebaseConfig'
// import * as GoogleSignIn from 'expo-google-sign-in'
import { Alert } from 'react-native'


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  loginWithGoogle: async (idToken, accessToken) => {
    // Working progress
    try {
      const { type, accessToken, user, idToken } = await Google.logInAsync(GoogleAuth);
      // Sla oq é isso
      if (type === 'success') {
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      return await firebase.auth().signInWithCredential(credential)
    } catch ({ message }) {
      Alert.alert('login: Error:' + message);
      return message
    }
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return firebase.auth().signOut();
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user);
  },
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email);
  },
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection("users")
      .doc(`${userData.uid}`)
      .set(userData);
  }
};

export default Firebase;
