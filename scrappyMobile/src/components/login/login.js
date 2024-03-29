import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import LoginForm from './loginform';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/Logo.png')} />
                    <Text style={styles.title}>SCRAPPY.IO</Text>
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
        width: 400,
        textAlign: "center",
        opacity: 0.8,
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 40,
        letterSpacing: 3
    },

})