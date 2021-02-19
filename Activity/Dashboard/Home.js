import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Platform,
    ToastAndroid
  } from 'react-native';

import styles from './style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id:1, title: "Laporan", image:"https://img.icons8.com/android/48/000000/user-male.png"},
                {id:2, title: "History", image:"https://img.icons8.com/dusk/70/000000/checklist.png"} ,
                {id:3, title: "Map", image:"https://img.icons8.com/dusk/70/000000/globe-earth.png"} ,
                {id:4, title: "Signout", image:"https://img.icons8.com/color/70/000000/shutdown.png"} ,
            ],
            counter : 1,
            emails : " "
        }
    }

    componentDidMount(){
        this._isMounted = true;
        auth().onAuthStateChanged((user) => {
            
        })
    }
}