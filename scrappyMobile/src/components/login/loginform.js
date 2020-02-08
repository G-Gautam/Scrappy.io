import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View styles={styles.container}>
                <StatusBar barStyle='light-content'>
                </StatusBar>
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    onSubmitEditing = {()=> this.passwordInput.focus()}
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

                >
                    <Text
                        style={styles.buttonText}>
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