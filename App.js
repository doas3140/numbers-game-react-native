import { Navigation } from 'react-native-navigation'

import LoginScreen from './src/screens/LoginScreen'
import MenuScreen from './src/screens/MenuScreen'
import SettingsModal from './src/screens/SettingsModal'
import SingleplayerScreen from './src/screens/SingleplayerScreen'
import EndGameModal from './src/screens/EndGameModal'

// Register Screens
Navigation.registerComponent('Login', ()=>LoginScreen)
Navigation.registerComponent('Menu', ()=>MenuScreen)
Navigation.registerComponent('Settings', ()=>SettingsModal)
Navigation.registerComponent('SingleplayerGame', ()=>SingleplayerScreen)
Navigation.registerComponent('EndGame', ()=>EndGameModal)

// Start app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'Menu'
  }
})