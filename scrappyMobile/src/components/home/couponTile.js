import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScreenStack } from 'react-native-screens';

export default class CouponTile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.code}>
                    <Text>{this.props.code}</Text>
                </View>
                <View style={styles.title}>
                    <Text>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    title: {
        backgroundColor: '#3498db',
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        width: '70%',
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    code: {
        backgroundColor: '#3498db',
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        width: '30%',
        flex: 0.5,
        padding: 10,
        justifyContent: 'center'
    }
})