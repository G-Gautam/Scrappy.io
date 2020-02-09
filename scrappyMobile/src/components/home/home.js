import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { withOrientation } from 'react-navigation';
import RestaurantTile from './restaurantTile';
var Carousel = require('react-native-carousel');
var names = [{ 'name': 'Jake', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png') }, { 'name': 'Bob', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png') }, { 'name': 'Lol', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png') }, { 'name': 'Lols', 'image': require('../../images/hand-arm-drawing-hands-png-clip-art.png') }];

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.getPlacesAndProcess();
        this.state = {
            dataArray: [],
            domains: [
                { name: 'McDonald\'s', domain: 'mcdonalds.com' },
                { name: 'SecondCupCoffeeCo.', domain: 'secondcup.com' },
                { name: 'Starbucks', domain: 'starbucks.com' },
                { name: 'LaPrep', domain: 'LaPrep.com' },
                { name: 'CoffeeHouse', domain: 'taidetehdas.fi' },
                { name: 'IDealCoffee', domain: 'idealcoffee.ca' },
                { name: 'Bridgehead', domain: 'bridgehead.ca' },
                { name: 'LaCatrinaChurros+CaféBar', domain: 'lacatrinachurros.com' },
                { name: 'OzKafe', domain: 'ozkafe.com' },
                { name: 'Harvey\'s', domain: 'harveys.ca' },
                { name: 'Popeyes', domain: 'popeyescanada.com' },
                { name: 'Wendy\'s', domain: 'wendys.com' },
                { name: 'FiveGuys', domain: 'fiveguys.com' },
                { name: 'Smoke\'sPoutinerie', domain: 'smokespoutinerie.com' },
                { name: 'BigPita', domain: 'bigpitara.com' },
                { name: 'BurgerKing', domain: 'bk.com' },
            ]
        }
    }
    getPlacesAndProcess = () => {
        console.log('here');
        return fetch('http://10.0.2.2:8080/places/all')
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach(element => {
                    for (let i = 0; i < this.state['domains'].length; i++) {
                        var value = this.state['domains'][i]
                        if (element.name === value.name || element.name.includes(value.name)) {
                            element.icon = value.domain;
                            break;
                        }
                        else {
                            element.icon = 'forkly.com'
                        }
                    }
                });
                this.setState({ dataArray: responseJson })
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <Text style={styles.title}>Places Near You</Text>
                <View style={styles.carouselContainer}>
                    <Carousel width={200} hideIndicators={false} indicatorAtBottom={false} animate={false} indicatorOffset={150} inactiveIndicatorColor="white" indicatorColor="grey">
                        {this.state['dataArray'].map(block => <RestaurantTile title={block.name} image={'https://logo.clearbit.com/' + block.icon + '?size=50'} />)}
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