import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import {
    ScreenStack
} from 'react-native-screens';

export default class RestaurantTile extends Component {
    render() {
        return ( <
            View style = {
                styles.container
            } >
            <
            Image style = {
                styles.image
            }
            source = {
                this.props.image
            } > < /Image> <
            Text style = {
                styles.title
            } > {
                this.props.title
            } < /Text> <
            /View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        backgroundColor: '#000',
        color: '#fff',
        width: 200,
        textAlign: 'center',
        fontSize: 20
    },
    image: {
        width: 200,
        height: 140
    }
})