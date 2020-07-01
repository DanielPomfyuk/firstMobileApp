import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import Home from "../app-pages/index"
import PlayScreen from "../app-pages/playScreen"
import WinnerScreen from "../app-pages/winnerScreen"
const screens = {
    
    Home:{
        screen: Home,
        navigationOptions: {
            headerShown: false,
          }
    },
    PlayScreen:{
        screen: PlayScreen,
        navigationOptions: {
            headerShown: false,
          }
    },
    WinnerScreen:{
        screen: WinnerScreen,
        navigationOptions: {
            headerShown: false,
          }
    },
}
const HomeStack = createStackNavigator(screens)
export default createAppContainer(HomeStack)