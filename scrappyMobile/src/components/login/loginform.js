import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import Radar from 'react-native-radar';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = { userId: '' }
        Radar.getPermissionsStatus().then((status) => {
            if (status !== 'GRANTED') {
                console.log("Asking for permission")
                Radar.requestPermissions(true);
            }
        });
    }
    loginRadar = () => {
        console.log(this.state.userId)
        //Google maps get places
        //Set geofences
        
        Radar.setUserId(this.state.userId);
        Radar.setDescription("Testing User");
        Radar.getPermissionsStatus().then((status) => {
            if (status === 'GRANTED') {
                console.log(status);
                Radar.startTracking();
                //this.updateLocation();
                this.props.prop1.navigate('Home');
            }
        });
    }

    updateLocation() {
        const location = {
            latitude: 39.2904,
            longitude: -76.6122,
            accuracy: 65
        };

        Radar.updateLocation(location).then((result) => {
            console.log(result.user);
        }).catch((err) => {
            console.log(err)
        });

        Radar.stopTracking();
    }
    render() {
        return (
            <View styles={styles.container}>
                <StatusBar barStyle='light-content'>
                </StatusBar>
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    value={this.state.userId}
                    onChangeText={(text) => this.setState({ userId: text })}
                    style={styles.input} />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    secureTextEntry
                    returnKeyType='go'
                    ref={(input) => this.passwordInput = input}
                    style={styles.input} />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.loginRadar()}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        LOGIN
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 10
    },
    buttonText: {
        textAlign: "center",
        color: '#FFF',
        fontWeight: '700'
    }
})