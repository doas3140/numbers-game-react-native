import React from 'react';
import { Alert, AppRegistry, StyleSheet, FlatList, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity, Button, ScrollView } from 'react-native';
import Cube from '../components/Cube'
import Row from '../components/Row'
import TimerCountdown from '../components/TimerCountdown'
import { createAnimation } from '../utils/animations'
import { CONST, COLORS, width, height, FONTS, COLORS2 } from '../utils/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import WaitingPlayerOverlay from '../components/WaitingPlayerOverlay'
import { socket, emit_numbers, on, off } from '../utils/socket_io.js'

class MultiplayerScreen extends React.Component {
    /* PROPS
    ! username
    
    /* STATES
    topRow (object{key,hints,numbers})
    history [](object)
    button (boolean) = show it or hide it
    animatedValueIncrease (animated number) = 0 -> 1
    currentPlayer (string) = player whose turn is now
    waitingForOthers (boolean) = for other players

    /* VARIABLES
    interpolatedValue1 (number) = 0 -> cube_size*2
    interpolatedValue2 (number) = 0 -> cube_size
    GAME_OVER (boolean)
    USERNAME (string) = this users username
    
    /* SOCKET.IO CODE
    // on_waitingForOtherPlayers -> loadingScreen()
    // on_gameStarted -> NEREIKIA?
    on_itsNewTurn(username) -> newTurn(username)
    on_gotNewNumbers -> 
    // on_gameEnded -> nereikalingas, nes appsas zinos ?
    */

    // Hide top header
    static navigatorStyle = {
        navBarHidden: true
    }

    // VARIABLES
    USERNAME = this.props.username
    GOAL_NR = [0,0,0,0]

    // SOCKET IO FUNCTIONS
    componentDidMount(){
        on('new_turn',(data)=>{
            this.setState({
                currentPlayer: data.next_player
            })
            this.newTurn(this.state.currentPlayer)
        })
        on('add_history',(data)=>{
            this.animateRowToHistory({numbers:data.numbers, hints:data.hints})
        })
    }

    componentWillUnmount(){
        off('new_turn')
        off('add_history')
    }

    // SET STATES
    state = {
        topRow: {
            key:0,
            hints:false,
            numbers: Array(this.props.numbersLength).fill().map((e,i)=>i+1)
        },    
        history: [],
        button: true,
        animatedValueIncrease: new Animated.Value(0),
        turn: 1,
        leftTime: '-',
        // new vars
        currentPlayer: 'Others',
        waitingForOthers: true,
        game_started: false
    }

    // INTERPOLATED VALUES FOR ANIMATIONS
    interpolatedValue1 = this.state.animatedValueIncrease.interpolate({
        inputRange: [0,1],
        outputRange: [0, CONST.CUBE_SIZE*2] //if first row starts at top
        // outputRange: [CONST.CUBE_SIZE*1, CONST.CUBE_SIZE*3]
    })

    interpolatedValue2 = this.state.animatedValueIncrease.interpolate({
        inputRange: [0,1],
        outputRange: [0, CONST.CUBE_SIZE] //if first row starts at top
        // outputRange: [CONST.CUBE_SIZE*1, CONST.CUBE_SIZE*2]
    })

    // GAME FUNCTIONS
    newTurn = (username)=>{
        if(username == this.USERNAME){
            this.setState({
                currentPlayer: username,
                waitingForOthers: false
            })
        } else {
            this.setState({
                currentPlayer: username
            })
        }
    }

    animateRowToHistory = (row)=>{
        this.setState({
            waitingForOthers: false
        })
        this.setRow(row)
        this.deleteButton(()=>{
            this.animate(()=>{
                this.addTopRowToHistory(()=>{
                    this.checkForEndGame(row.hints)
                    this.setState({
                        waitingForOthers: true,
                        currentPlayer: 'Server'
                    })
                })
            })
        })
    }

    endGame = (username,headerText)=>{
        // kill top row
        this.interpolatedValue1 = -300
        this.setState({})
        // show end game screen
        this.props.navigator.showModal({
            screen:'EndGame',
            passProps: {
                headerText: headerText,
                turn: this.state.turn-1,
                username: username
            },
            animationType: 'none'
        })
    }

    setRow = (row)=>{
        let key = this.state.topRow.key
        this.state.topRow = row
        this.state.topRow.key = key
        this.setState({
            topRow: this.state.topRow
        })
    }

    deleteButton = (callback)=>{
        this.setState({
            button: false
        })
        callback()
    }

    animate = (callback)=>{
            this.state.animatedValueIncrease.setValue(0)
            
            animation = createAnimation(Value=this.state.animatedValueIncrease, duration=CONST.ROW_SLIDE_DOWN_DURATION, easing=Easing.ease, delay=0)
            animation.start(()=>{
                callback()
            })
    }

    checkForEndGame = (hints)=>{
        if(hints[1] == this.props.numbersLength){
            this.GOAL_NR = this.state.history[0].numbers
            this.GAME_OVER = true
            if(this.state.currentPlayer=='Server'){
                this.endGame(this.USERNAME,'YOU WON')
            } else {
                this.endGame(this.state.currentPlayer,'YOU LOST')
            }
        }
    }

    addTopRowToHistory = (callback)=>{
        let new_row = Object.assign({}, this.state.topRow)
        new_numbers = this.state.topRow.numbers.slice()

        this.state.history.unshift({key:new_row.key, hints:new_row.hints, numbers:new_numbers})
        this.state.topRow.key += 1
        this.setState({
            button: true,
            history: this.state.history,
            turn: this.state.turn+1
        })
        this.state.animatedValueIncrease.setValue(0)
        callback()
    }

    onButtonPress = ()=>{
        this.setState({
            waitingForOthers: true,
            currentPlayer: 'Server'
        })

        emit_numbers(this.USERNAME,this.state.topRow.numbers)
        // setTimeout(cannot connect to server, time)
    }

    onNumberPressCallback = (nr_index, new_number)=>{
        this.changeNumber(nr_index,new_number)
    }

    onNumberLongPressCallback = (nr_index)=>{
        this.props.navigator.showModal({
            screen:'SelectNumber',
            passProps: {
                index: nr_index,
                numbers: this.state.topRow.numbers.slice(),
                changeNumber: this.changeNumber
            },
            animationType: 'none'
        })
    }

    changeNumber = (index,new_number)=>{
        this.state.topRow.numbers[index] = new_number
        this.setState({
            topRow: this.state.topRow
        })
    }

    exit = ()=>{
        Alert.alert(
            'Are you sure you want to leave?',
            '',
            [
                {text:'No', onPress: ()=>{}, style:'cancel'},
                {text:'Yes', onPress: ()=>{
                    this.props.navigator.pop({
                        animated: true,
                        animationType: 'fade'
                    })
                }}
            ]
        )
    }

    onTimeIsUp = ()=>{
        emit_numbers(this.USERNAME,this.state.topRow.numbers)
    }

    showHelp = ()=>{
        this.props.navigator.showModal({
            screen: 'Help',
            animationType: 'none'
        })
    }

    render(){
        return (
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.exit} style={[styles.headerItem,{flex:1,justifyContent:'flex-start', marginLeft:8}]}>
                        <Icon name='arrow-back' size={FONTS.game.multiplayerGame.icon_back} color={COLORS2.game.multiplayerGame.icon_back} />
                    </TouchableOpacity>
                    <View style={styles.headerItem}>
                        <View style={[styles.headerItem,{justifyContent:'flex-end'}]}>
                            <Icon name='filter-none' size={FONTS.game.multiplayerGame.icon_turn} color={COLORS2.game.multiplayerGame.icon_turn} style={{marginLeft:5}} />
                        </View>
                        <View style={[styles.headerItem,{justifyContent:'flex-start'}]}>
                            <Text style={styles.headerNumber}> { this.state.turn } </Text>
                        </View>
                    </View>
                    <View style={styles.headerItem}>
                        { (()=>{
                            if(this.props.timer != '-'){
                                return (
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <View style={[styles.headerItem,{justifyContent:'flex-end'}]}>
                                            <Icon name='timer' size={FONTS.game.multiplayerGame.icon_timer} color={COLORS2.game.multiplayerGame.icon_timer} />
                                        </View>
                                        <View style={[styles.headerItem,{justifyContent:'flex-start'}]}>

                                            { (()=>{
                                                if(this.state.currentPlayer == this.USERNAME){
                                                    return <TimerCountdown initialSeconds={this.props.timer} callback={this.onTimeIsUp}/>
                                                } else {
                                                    return <Text style={styles.headerNumber}> {this.props.timer} </Text>
                                                }
                                            })() }
                                        </View>
                                    </View>
                                )
                            } else {
                                return <Icon name='timer-off' size={FONTS.game.multiplayerGame.icon_timer_off} color={COLORS2.game.multiplayerGame.icon_timer_off} style={{alignSelf:'center', marginRight:10}} />
                            }
                        })() }
                    </View>    
                    <TouchableOpacity onPress={this.showHelp} style={[styles.headerItem,{flex:1}]}>
                        <Icon name='help-outline' size={FONTS.game.multiplayerGame.icon_help} color={COLORS2.game.multiplayerGame.icon_help} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.gameWindow, {
                    marginRight: CONST.ROW_BONUS_MARGIN + (5-this.props.numbersLength)*CONST.CUBE_SIZE/2,
                    marginLeft: CONST.ROW_BONUS_MARGIN + (5-this.props.numbersLength)*CONST.CUBE_SIZE/2
                }]}>
                
                    <Animated.View style={{
                        transform: [
                            { translateY: this.interpolatedValue1 }
                        ]
                    }}>
                        <Row index={0} row={this.state.topRow} button={this.state.button} onButtonPress={this.onButtonPress} newStyleLeft={{backgroundColor:COLORS2.game.multiplayerGame.top_row_bg}} newStyleRight={{backgroundColor:COLORS2.game.multiplayerGame.top_row_bg}} onNumberPressCallback={this.onNumberPressCallback} onNumberLongPressCallback={this.onNumberLongPressCallback} />
                    </Animated.View>

                    { (()=>{
                            if(this.GAME_OVER){
                                return (
                                    <View style={[styles.gg_bg_block, {
                                        left: 0, top: 0,
                                        width: (this.props.numbersLength+2)*CONST.CUBE_SIZE,
                                        height: CONST.CUBE_SIZE*2,
                                    }]}>
                                        <CommunityIcon name='bullseye' size={FONTS.game.multiplayerGame.icon_bullseye} color={COLORS2.game.multiplayerGame.icon_bullseye}/>
                                        <Text style={styles.ggText}>
                                            {this.GOAL_NR}
                                        </Text>
                                    </View>
                                )
                            }
                        })() }

                    <Animated.View style={[{
                        transform: [
                            { translateY: this.interpolatedValue2 }
                        ]
                    }, styles.history]}>

                        <FlatList styles={styles.history}
                                //scrollEnabled = {false}
                                getItemLayout = {(data,index)=>{return {length:CONST.CUBE_SIZE,index,offset:CONST.CUBE_SIZE*index}}}
                                data = {this.state.history}
                                extraData = {this.state}
                                renderItem = {({item})=>{
                                    return <Row key={item.key} index={item.key} row={item} />
                                }}
                        />
                    
                    </Animated.View>
                
                </View>
                
                { (()=>{
                    if(this.GAME_OVER){
                        return (
                            null
                        )
                    } else {
                        return (
                            <WaitingPlayerOverlay modalVisible={this.state.waitingForOthers} username={this.state.currentPlayer}/>
                        )
                    }
                })() }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS2.game.multiplayerGame.background
    },
    header: {
        flexDirection: 'row',
        backgroundColor: COLORS2.game.multiplayerGame.header_bg,
        height: CONST.CUBE_SIZE
    },
    headerItem: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNumber:{
        fontSize: FONTS.game.multiplayerGame.turn_text,
        fontFamily: FONTS.family,
        color: COLORS2.game.multiplayerGame.turn_text
    },
    history: {
        position: 'absolute',
        top: CONST.CUBE_SIZE*2,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'white' // can make animation
    },
    gameWindow: {
        flex: 1,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        backgroundColor: COLORS2.game.multiplayerGame.game_window_bg,
        marginTop: CONST.GAME_WINDOW_MARGIN,
        marginBottom: CONST.GAME_WINDOW_MARGIN
        // alignItems: 'center'
    },
    gg_bg_block: {
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: COLORS2.game.multiplayerGame.end_bg,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ggText: {
        marginLeft: 10,
        fontSize: FONTS.game.multiplayerGame.end_numbers_text,
        fontFamily: FONTS.family,
        color: COLORS2.game.multiplayerGame.end_text
    }
})

export default MultiplayerScreen