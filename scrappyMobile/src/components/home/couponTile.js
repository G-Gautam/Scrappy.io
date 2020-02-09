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
        backgroundColor: 'rgba(241,147,44,0.9)',
        flex: 0.3,
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    title: {
        backgroundColor: '#FFF',
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        width: '60%',
        marginLeft: '5%',
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    code: {
        backgroundColor: '#FFF',
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        width: '30%',
        flex: 0.5,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    }
})