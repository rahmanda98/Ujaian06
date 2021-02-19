import React from 'react'
import {
    ActionsContainer,
    Button,
    FieldsContainer,
    Fieldset,
    Form,
    FormGroup,
    Input,
    Label,
    Select,
    Switch
  } from 'react-native-clean-form'

import * as ImagePicker from 'react-native-image-picker'

import styles from './style'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Alert, PermissionsAndroid } from 'react-native';

const userGenders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
]

const userStatus = [
    {label: 'Married', value: 'married'},
    {label: 'Single', value: 'single'},
    {label: 'Divorced', value: 'divorced'},
]

const FireBaseStoreage = storage();

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: " ",
            gender: " ",
            umur: " ",
            status: " ",
            downloadUrl :"",
            uri:"",
            fileImage : null
        }
    }

    requestPermissions = async () => {
        if (Platform.OS === "android") {
           try {
               const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
               ]);
                // If Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
           } catch (error) {
               console.warn(error);
               alert('Write Permission error', error);
           }
           return false;
        }else{return true;}
    };

    requestCameraPermissions = async() => {
        try {
            const granted = await PermissionsAndroid.requestMultiple ([
                PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

            ])
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera Permission given");
                this.captureCamera();
            }else {
                console.log("Camera permission denied");
            }
        } catch (error) {
            console.warn(error);
        }
    };

    captureCamera = () => ImagePicker.launchCamera(
        {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        },(response) => {
            console.log(response);
            this.setState({uri: response.uri})
            this.setState({fileImage:response})
        },
    )

    submitData = () => {
        let storageRef = this.createStorageReference(this.state.fileImage)
        storageRef.putFile(this.state.fileImage.uri).then(() => {
            console.log(JSON.stringify(res))
            
            storageRef.getDownloadURL().then(
                (download) => {
                    firestore()
                    .collection('CreateUser')
                    .doc(this.state.email)
                    .set({
                        name: this.state.name,
                        gender: this.state.gender,
                        umur: this.state.umur,
                        status: this.state.status,
                        urlDownload: download

                    }).then((res) => {
                        console.log(JSON.stringify(res))
                        console.log('User Registred');
                    }).catch((error) => {
                        Alert.alert("Failed Register", JSON.stringify(error))
                    });
                })
        }).catch((error) => {
            console.log(error)
        })
    }

    createStorageReference = response => {
        const {filename} = response
        return FireBaseStoreage.ref(fileName)
    }

    render() {
        return (
            <Form>
                <FieldsContainer>
                    <Fieldset label="Insert New User">
                        <FormGroup style={styles.FormGroup}>
                            <Label>Nama : </Label>
                            <Input placeholder="Nama" onChangeText={(name) => this.setState({name: name})}/>
                        </FormGroup>
                        <FormGroup style={styles.FormGroup}>
                            <Label>Gender : </Label>
                            <Select 
                                name= "LGender"
                                label = "Gender"
                                options={userGenders}
                                placeholder="Genders"
                                onValueChange={(gender) => this.setState({gender: gender})}
                            />
                        </FormGroup>
                        <FormGroup style={styles.FormGroup}>
                            <Label>Umur : </Label>
                            <Input placeholder="Umur" onChangeText={(umur) => this.setState({umur: umur})}/>
                        </FormGroup>
                        <FormGroup style={styles.FormGroup}>
                            <Label>Marriage Status : </Label>
                            <Select 
                                name= "LStatus"
                                label = "Status"
                                options={userStatus}
                                placeholder="Status"
                                onValueChange={(status) => this.setState({status: status})}
                            />
                        </FormGroup>
                    </Fieldset>
                    <View style={styles.image}>
                        <Image
                            style={styles.cameraContainer}
                             source={{uri: this.state.uri}}
                        />
                    </View>
                </FieldsContainer>
                <Button
                    title="Take Image"
                    onPress={() => {
                        if (this.requestPermissions) {
                            this.captureCamera
                        }
                    }}
                    style={styles.Button}>
                </Button>
                <ActionsContainer>
                    <Button title="Submit" onPress={this.submitData}>Save Data User</Button>
                </ActionsContainer>
            </Form>
        )
    }
}