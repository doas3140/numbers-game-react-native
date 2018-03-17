import { Navigation } from 'react-native-navigation'

import MenuScreen from './src/screens/MenuScreen'
import SettingsModal from './src/screens/SettingsModal'
import ReadyModal from './src/screens/ReadyModal'
import SingleplayerScreen from './src/screens/SingleplayerScreen'
import EndGameModal from './src/screens/EndGameModal'
import MultiplayerScreen from './src/screens/MultiplayerScreen'
import FindingGameIndicator from './src/screens/FindingGameIndicator'

// Register Screens
Navigation.registerComponent('Menu', ()=>MenuScreen)
Navigation.registerComponent('Settings', ()=>SettingsModal)
Navigation.registerComponent('SingleplayerGame', ()=>SingleplayerScreen)
Navigation.registerComponent('EndGame', ()=>EndGameModal)
Navigation.registerComponent('MultiplayerGame', ()=>MultiplayerScreen)
Navigation.registerComponent('ReadyModal', ()=>ReadyModal)
Navigation.registerComponent('FindingGame', ()=>FindingGameIndicator)

// Start app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'Menu'
  }
})