/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Login from "./Activity/Login Page/Login";
import Register from "./Activity/Register Page/Register";
import Home from "./Activity/Home Page/Home";
import SplashScreen from "./Activity/SplashScreen Page/SplashScreen";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      isLoggedIn: false,
    }
  }

componentDidMount(){

}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} />
             <Stack.Screen name="Login" component={Login} />
             <Stack.Screen name="Dashboard" component={Home} />
             <Stack.Screen name="Registration" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;