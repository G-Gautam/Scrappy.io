import { createStackNavigator } from 'react-navigation';
import Home from './components/home/home';
import Login from './components/login/login'

const AppNavigator = createStackNavigator({
    Login: { screen: Login},
    Home: { screen: Home },
});

export default AppNavigator;