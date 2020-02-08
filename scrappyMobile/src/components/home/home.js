import React, { Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';

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
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})