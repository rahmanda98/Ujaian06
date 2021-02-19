import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Button
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        firestore()
        .collection('CreateUser')
        .get()
        .then(querySnapShot => {
            console.log('User List : ',querySnapShot.size);

            querySnapShot.forEach(documentSnapShot => {
                console.log('Data: ', documentSnapShot.id, documentSnapShot.data());
            });
        });
    }

    newUsers = () => {
        this.props.navigation.navigate("CreateUser")
    }

    render() {
        return(
            <FlatList 
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ItemSeparatorComponent={() => {
                return (
                    <View style={styles.separator}></View>
                )
            }}
            keyExtractor={(item) => {
                return item.id;
            }}
            renderItem={(item) => {
                const Notifaction = item.item;
                return (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { }}>
                            <Image style={styles.image}/>
                            <Button
                                style={styles.Button}
                                onPress={this.newUsers}
                                title="Create User"
                                accessibilityLabel="Create a User"
                            ></Button>
                        </TouchableOpacity>
                    </View>
                )
            }}
            ></FlatList>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        marginTop: 10,
    },
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 20
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "Top",
        justifyContent: 'Right'
    },
}); 