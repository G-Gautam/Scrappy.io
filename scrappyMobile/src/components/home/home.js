import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { withOrientation } from 'react-navigation';
import RestaurantTile from './restaurantTile';
var Carousel = require('react-native-carousel');
var names = [{'name':'Jake', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png')}, {'name':'Bob', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png')}, {'name':'Lol', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png')}, {'name':'Lols', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png')}];

export default class Home extends Component {

    render() {
        return (

            <View style={styles.homeContainer}>
                <Text style={styles.title}>Places Near You</Text>
                <View style={styles.carouselContainer}>
                    <Carousel width={200} hideIndicators={false} indicatorAtBottom={false} animate={false} indicatorOffset={150} inactiveIndicatorColor="white" indicatorColor="grey">
                        {names.map(block =><RestaurantTile title={block.name} image={block.image}/>)}
                    </Carousel>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,1)',
        alignItems: 'center',
    },
    carouselContainer: {
        flex: 0.3,
        width: 200
    },
    container: {
        width: 200,
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        color: '#3498db',
        marginBottom: 10

    }
})