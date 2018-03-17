import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MenuTab from '../components/MenuTab'
import { COLORS, CONST } from '../utils/constants'
import { socket, emit_info, emit_find_game, emit_ready_to_play, on } from '../utils/socket_io.js'

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
        mp_rowLength: 3,
        mp_timer: 60
    }
    USERNAME = 'mr-random'

    componentDidMount(){
        //test
        // this.singleplayer_startGame()
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
    multiplayer_findGame = ()=>{
        emit_info(this.USERNAME) // nereiks veliau, nes ir taip visada siusim userio name
        setTimeout(()=>{ //nereiks veliau 
            this.props.navigator.showLightBox({
                screen:'FindingGame',
                style:{
                    tapBackgroundToDismiss: true,
                    backgroundBlur: 'dark',
                    username: this.USERNAME,
                    numbersLength: this.mp_rowLength,
                    timer: this.mp_timer,
                    callback: this.showReadyModal
                }
            })
        },2000) //nereiks veliau
    }

    showReadyModal = ()=>{
        this.props.navigator.showLightBox({
            screen: 'ReadyModal',
            passProps: {
                startGame: this.multiplayer_startGame,
                username: this.USERNAME
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
    singleplayer_timer = ()=>{
        alert('Timer in singleplayer is unavailable')
    }
    multiplayer_rowLength = ()=>{
        if(this.state.mp_rowLength == 5){
            this.setState({
                mp_rowLength: 'any'
            })
        } else
        if(this.state.mp_rowLength == 'any'){
            this.setState({
                mp_rowLength: 3
            })
        } else {
            this.setState({
                mp_rowLength: this.state.mp_rowLength+1
            })
        }
    }
    multiplayer_timer = ()=>{
        if(this.state.mp_timer == 'any'){
            this.setState({
                mp_timer: '-'
            })
        } else
        if(this.state.mp_timer == '-'){
            this.setState({
                mp_timer: 30
            })
        } else
        if(this.state.mp_timer == 90){
            this.setState({
                mp_timer: 'any'
            })
        } else {
            this.setState({
                mp_timer: this.state.mp_timer+30
            })
        }
    }
    // change username
    changeUsername = (username)=>{
        this.USERNAME = username
        // all to lower case!
        console.log('New name - ', this.USERNAME)
    }
 
    render(){
        return (
            <View style={styles.container}>

                <View style={styles.nothing} />
                
                <View style={styles.title}>
                    <FontAwesomeIcon name='cube' size={70} color={COLORS.fontGray} />
                    <Text style={{fontFamily:'JordanBoldGrunge', fontSize:35, color:COLORS.fontGray, marginTop: 0}}> numbers game </Text>
                </View>

                <View style={styles.singleplayer}>
                    <MenuTab title={'singleplayer'} buttonTitle={'start game'} options={[this.state.sp_rowLength,this.state.sp_timer]} onMainButton={this.singleplayer_startGame} onOptionsButton1={this.singleplayer_rowLength} onOptionsButton2={this.singleplayer_timer} />
                </View>

                <View style={styles.multiplayer}>
                    <MenuTab title={'multiplayer'} buttonTitle={'find game'} options={[this.state.mp_rowLength,this.state.mp_timer]}  onMainButton={this.multiplayer_findGame} onOptionsButton1={this.multiplayer_rowLength} onOptionsButton2={this.multiplayer_timer}/>
                </View>
                
                <View style={styles.nothing} />
                <View style={styles.nothing} />
                <View style={styles.nothing} />

                <View style={styles.settings}>
                    <TouchableOpacity onPress={this.onSettingsPress}>
                        <Icon name='settings' size={40} color={COLORS.fontGray}/>
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
      backgroundColor: COLORS.bg
    },
    settings: {
        position: 'absolute',
        // backgroundColor: 'green',
        right: 0,
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