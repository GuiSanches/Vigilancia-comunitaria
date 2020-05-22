import * as firebase from "firebase";
import * as Google from 'expo-google-app-auth';

import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import * as GoogleSignIn from 'expo-google-sign-in'
import {Alert} from 'react-native'


// Initialize Firebase
let a = firebase.initializeApp(firebaseConfig);
console.log(a.options)
const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  loginWithGoogle: async () => {
    // Working progress
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken);
        const googleProfileData = await firebase.auth().signInWithCredential(credential);
      }
    } catch ({ message }) {
      Alert.alert('login: Error:' + message);
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
