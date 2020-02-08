import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import LoginForm from './loginform';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/hand-arm-drawing-hands-png-clip-art.png')} />
                    <Text style={styles.title}>Insert quirk here</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm prop1={this.props.navigation}></LoginForm>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    formContainer: {
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 100,
        textAlign: "center",
        opacity: 0.8
    },

})