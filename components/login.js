import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { View ,Text,Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState,useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Login({navigation}){
    GoogleSignin.configure({
        webClientId: '511406748599-ku75uop3lau27dso9c1bdlkgsu44iek4.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      });

    const saveUser = async(name,email)=>{
        console.log(name,email)
        const response = await fetch(`http://172.31.52.60/software_project/login`, {   //Ansh =>172.31.52.60, Jay => 172.31.33.189
                method: "post",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({username:name,email:email })
            })
            const json = await response.json()
            console.log(json)
            await SecureStore.setItemAsync("email", email)
            navigation.navigate('Home')
    }

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // console.log(idToken)
        
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential)
        user_sign_in.then(async(user)=>{
            console.log(user.additionalUserInfo.profile.name,user.additionalUserInfo.profile.email)
            if(user.additionalUserInfo.profile.name && user.additionalUserInfo.profile.email){
                await saveUser(user.additionalUserInfo.profile.name,user.additionalUserInfo.profile.email)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return(
        <View>
            <Text>Login with Google</Text>
            <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            />
        </View>
    )
}