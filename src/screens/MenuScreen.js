import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MenuTab from '../components/MenuTab'
import { COLORS, CONST, FONTS, COLORS2 } from '../utils/constants'
import { socket, emit_info, emit_find_game, emit_ready_to_play, on, off } from '../utils/socket_io.js'

class MenuScreen extends React.Component {
    /* PROPS

    /* STATES
    sp_rowLength: 3,
    sp_timer: '-',
    mp_rowLength: 3,
    mp_timer: 60
    
    /* VARIABLES
    socket

    */

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        sp_rowLength: 3,
        sp_timer: '-',
        sp_userCount: 1,
        mp_rowLength: 4,
        mp_timer: 60,
        mp_userCount: 2
    }
    USERNAME = 'mister'
    CONNECTED = true

    componentDidMount(){
        on('connect_error',     ()=>{this.CONNECTED=false; console.log(false)})
        on('reconnect_error',   ()=>{this.CONNECTED=false; console.log(false)})
        on('reconnect',         ()=>{this.CONNECTED=true;  console.log(true)})
    }

    multiplayer_startGame = ()=>{
        this.props.navigator.push({
            screen: 'MultiplayerGame',
            passProps: {
                numbersLength: this.state.mp_rowLength,
                timer: this.state.mp_timer,
                username: this.USERNAME
            }
        })
    }
    singleplayer_startGame = ()=>{
        this.props.navigator.push({
            screen: 'SingleplayerGame',
            passProps: {
                numbersLength: this.state.sp_rowLength,
                timer: this.state.sp_timer
            }
        })
    }

    // Moving to Other Screens
    onSettingsPress = ()=>{
        this.props.navigator.showLightBox({
            screen:'Settings',
            passProps: {
                username: this.USERNAME,
                changeUsername: this.changeUsername
            },
            style:{
                backgroundBlur: 'dark'
            }
        })
    }

    onHelpPress = ()=>{
        this.props.navigator.showModal({
            screen: 'Help'
        })
    }

    multiplayer_findGame = ()=>{
        if(this.CONNECTED){
            emit_info(this.USERNAME)
            on('emit_info_res', (data)=>{
                console.log('Name is allowed:', data.name_allowed)
                off('emit_info_res')
                if(data.name_allowed){
                    this.showFindingGame()
                } else {
                    this.nameIsNotAllowed(this.USERNAME)
                }
            })
        } else {
            alert("Can't connect to server...")
        }
    }

    nameIsNotAllowed = (name)=>{
        alert('"'+name+'" name is currently in use')
    }

    showFindingGame = ()=>{
        this.props.navigator.showModal({
            screen:'FindingGame',
            passProps: {
                username: this.USERNAME,
                user_count: this.state.mp_userCount,
                startGame: this.multiplayer_startGame   
            }
        })
    }

    // Option Button Actions
    singleplayer_rowLength = ()=>{
        if(this.state.sp_rowLength == 5){
            this.setState({
                sp_rowLength: 3
            })
        } else {
            this.setState({
                sp_rowLength: this.state.sp_rowLength+1
            })
        }
    }
    singleplayer_userCount = ()=>{
        //
    }
    multiplayer_rowLength = ()=>{
        // if(this.state.mp_rowLength == 5){
        //     this.setState({
        //         mp_rowLength: 'any'
        //     })
        // } else
        // if(this.state.mp_rowLength == 'any'){
        //     this.setState({
        //         mp_rowLength: 3
        //     })
        // } else {
        //     this.setState({
        //         mp_rowLength: this.state.mp_rowLength+1
        //     })
        // }
        alert('For now only 4 rows are available in multiplayer mode.')
    }
    multiplayer_userCount = ()=>{
        if(this.state.mp_userCount == 'any'){
            this.setState({
                mp_userCount: 2
            })
        } else
        if(this.state.mp_userCount == 4){
            this.setState({
                mp_userCount: 'any'
            })
        } else {
            this.setState({
                mp_userCount: this.state.mp_userCount+1
            })
        }
    }
    // change username
    changeUsername = (username)=>{
        this.USERNAME = username
        console.log('New name - ', this.USERNAME)
    }
 
    render(){
        return (
            <View style={styles.container}>

                <View style={styles.nothing} />
                
                <View style={styles.title}>
                    <FontAwesomeIcon name='cube' size={FONTS.mainMenu.logo_size} color={COLORS2.mainMenu.logo} />
                    <Text style={{fontFamily:FONTS.family, fontSize:FONTS.mainMenu.logo_text, color:COLORS2.mainMenu.logo_text, marginTop: 0}}> numbers game </Text>
                </View>

                <View style={styles.singleplayer}>
                    <MenuTab title={'singleplayer'} buttonTitle={'start game'} options={[this.state.sp_rowLength,this.state.sp_userCount]} onMainButton={this.singleplayer_startGame} onOptionsButton1={this.singleplayer_rowLength} onOptionsButton2={this.singleplayer_userCount} />
                </View>

                <View style={styles.multiplayer}>
                    <MenuTab title={'multiplayer'} buttonTitle={'find game'} options={[this.state.mp_rowLength,this.state.mp_userCount]}  onMainButton={this.multiplayer_findGame} onOptionsButton1={this.multiplayer_rowLength} onOptionsButton2={this.multiplayer_userCount}/>
                </View>
                
                <View style={styles.nothing} />
                <View style={styles.nothing} />
                <View style={styles.nothing} />

                <View style={[styles.settings,{right:0}]}>
                    <TouchableOpacity onPress={this.onHelpPress}>
                        <Icon name='help' size={FONTS.mainMenu.icon_help} color={COLORS2.mainMenu.icon_help}/>
                    </TouchableOpacity>
                </View>

                <View style={[styles.settings,{left:0}]}>
                    <TouchableOpacity onPress={this.onSettingsPress}>
                        <Icon name='settings' size={FONTS.mainMenu.icon_settings} color={COLORS2.mainMenu.icon_settings}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: 'wrap',
      backgroundColor: COLORS2.mainMenu.background
    },
    settings: {
        position: 'absolute',
        top: 0,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        margin: 0
    },
    title: {
        flex:5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleplayer: {
        flex:3
    },
    multiplayer: {
        flex:3,
        marginTop:10
    },
    nothing: {
        flex:1
    }

  })

export default MenuScreen