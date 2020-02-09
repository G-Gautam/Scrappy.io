import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { withOrientation } from 'react-navigation';
import RestaurantTile from './restaurantTile';
import CouponTile from './couponTile';
var Carousel = require('react-native-carousel');
import Radar from 'react-native-radar';

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
                { name: 'Subway', domain: 'subway.com' },
            ]
        }
    }
    getPlacesAndProcess = () => {
        console.log('here');
        return fetch('http://39c118ea.ngrok.io/places/all')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'OKAY') {
                    Radar.startTracking();
                    Radar.on('events', (result) => {
                        result.user.geofences.forEach(element => {
                            for (let i = 0; i < this.state['domains'].length; i++) {
                                var value = this.state['domains'][i]
                                if (element.description === value.name || element.description.includes(value.name)) {
                                    element.externalId = value.domain;
                                    break;
                                }
                                else {
                                    element.externalId = 'forkly.com'
                                }
                            }
                        });
                        this.setState({ dataArray: result.user.geofences });
                        this.getsCoupons();
                    });

                    Radar.on('location', (result) => {
                        // do something with result.location, result.user
                    });

                    Radar.on('error', (err) => {
                        // do something with err
                    });
                    this.updateLocation();
                    Radar.stopTracking();
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    getsCoupons(){
        return fetch('http://39c118ea.ngrok.io/places/')
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <Text style={styles.title}>Places Near You</Text>
                <View style={styles.carouselContainer}>
                    <Carousel width={200} hideIndicators={false} indicatorAtBottom={false} animate={false} indicatorOffset={150} inactiveIndicatorColor="white" indicatorColor="grey">
                        {this.state['dataArray'].map(block => <RestaurantTile title={block.description} image={'https://logo.clearbit.com/' + block.externalId} />)}
                    </Carousel>
                </View>
                {/* <Button onPress={() => this.updateLocation()} title='Button'></Button> */}
                <CouponTile title="BLAH" code="BLAH"></CouponTile>
            </View>
        )
    }

    updateLocation = () => {
        Radar.startTracking();

        const location = {
            latitude: 39.2904,
            longitude: -76.6122,
            accuracy: 65
        };

        Radar.updateLocation(location).then((result) => {
            console.log(result.user);
            Radar.stopTracking();
        }).catch((err) => {
            console.log(err)
        });
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