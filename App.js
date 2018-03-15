import { Navigation } from 'react-native-navigation'

import LoginScreen from './src/screens/LoginScreen'
import MenuScreen from './src/screens/MenuScreen'
import SettingsModal from './src/screens/SettingsModal'

// Register Screens
Navigation.registerComponent('Login', ()=>LoginScreen)
Navigation.registerComponent('Menu', ()=>MenuScreen)
Navigation.registerComponent('Settings', ()=>SettingsModal)

// Start app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'Menu'
  }
})