import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './components/home/home';
import Login from './components/login/login'

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        }
    },
});

const appNav = createAppContainer(AppNavigator);
export default appNav;