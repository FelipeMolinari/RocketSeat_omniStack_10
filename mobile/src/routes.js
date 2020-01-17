import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: "FindDevs",
            },
        },
        Profile: {

            screen: Profile,
            navigationOptions: {
                title: "Perfil no github",
            },
        },
     }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: "#7D40E7",
                color: "#FFF"
            },
        },
    })
)

export default Routes