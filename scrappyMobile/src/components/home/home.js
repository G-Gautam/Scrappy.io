import React, { Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Home extends Component{
    render(){
        return(
            <View style={styles.homeContainer}>
                <Text>HELLO</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    homeContainer:{
        flex: 1,
        padding: 20
    }
})