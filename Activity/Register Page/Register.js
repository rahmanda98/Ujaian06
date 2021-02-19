import React, { Component } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from './Style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            email: "",
            password: "",
            address: "",
        }

       
    }

    async onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    UserRegister = () => {
        console.log("Test Register")
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            console.log("user account signed in");
            console.log("Response" + response)

            firestore()
            .collection("users")
            .doc(this.state.email)
            .set({
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            }).then(() => {
                this.props.navigation.navigate("Dashboard")
                console.log("Thank You for Registering");
            }).catch((error) => {
                Alert.alert("Register Failed", JSON.stringify(error))
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.log(error);
        })
    }
     render() {
         return (
            <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/ic_launcher.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(name) => this.setState({ name : name})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(email) => this.setState({ email : email})}
                   
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(password) => this.setState({ password : password})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(repassword) => this.setState({ repassword : repassword})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    
                    placeholder='Address'
                    onChangeText={(address) => this.setState({ address : address})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.registerUser}
                    >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text  style={styles.footerLink}>Log in</Text></Text>
                </View>
                <View style={styles.button} onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}>
                    <Text style={styles.buttonTitle}>Facebook Sign In</Text>
                </View>
            </KeyboardAwareScrollView>
            </View>
        );
     }
    
}
