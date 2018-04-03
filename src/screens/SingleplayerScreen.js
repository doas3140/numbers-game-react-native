import React from 'react';
import { Alert, AppRegistry, StyleSheet, FlatList, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity, Button, ScrollView } from 'react-native';
import Cube from '../components/Cube'
import Row from '../components/Row'
import TimerCountdown from '../components/TimerCountdown'
import { createAnimation } from '../utils/animations'
import { CONST, COLORS, width, height, FONTS, COLORS2 } from '../utils/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class SingleplayerScreen extends React.Component {
    /* PROPS
    numbersLength (number) - total length of row (3-5)
    
    /* STATES
    topRow (object{key,hints,numbers})
    history [](object)
    button (boolean) = show it or hide it
    animatedValueIncrease

    /* VARIABLES
    GOAL_NR [](4numbers)
    interpolatedValue1 (number) = 0 - cube_size*2
    interpolatedValue2 (number) = 0 - cube_size
    GAME_OVER (boolean)
    
    */

    static navigatorStyle = {
        navBarHidden: true
    }

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
        leftTime: '-'
    }

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

    generateRandomNumbers = ()=>{
        let randomNumber = ()=>{
            return Math.floor(Math.random()*10)
        }
        let randomNumbers = []
        while(randomNumbers.length != this.props.numbersLength){
            let random_number = randomNumber()
            if(!randomNumbers.includes(random_number)){
                randomNumbers.push(random_number)
            }
        }
        return randomNumbers
    }

    componentDidMount(){
        // MAX = nr_array_length * 2 + random from [1,2]
        this.MAX_TURNS = this.state.topRow.numbers.length*2 + (Math.floor(Math.random()*2)+1)
        this.GOAL_NR = this.generateRandomNumbers()
        // testing
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

    getHints = (GUESS_NR, GOAL_NR)=>{
        // numbers = [n1,n2,n3,n4]
        // returns hints = [h1,h2]
        let [h1,h2] = [0,0]

        for(let i1=0;i1<GOAL_NR.length;i1++){
            for(let i2=0;i2<GUESS_NR.length;i2++){
                let [n1,n2] = [GOAL_NR[i1], GUESS_NR[i2]]
                if(n1 == n2){
                    h1 = h1 + 1
                    if(i1 == i2){
                        h2 = h2 + 1
                    }
                }
            }
        }
        
        return [h1,h2]
    }

    checkForEndGame = (hints)=>{
        console.log(this.state.history)
        if(hints[1] == this.props.numbersLength){
            this.GAME_OVER = true
            this.setState({})
            setTimeout(()=>{
                this.endGame('YOU WON')
            },500)
        }
        else if(this.state.turn-1 == this.MAX_TURNS){
            this.GAME_OVER = true
            this.setState({})
            setTimeout(()=>{
                this.endGame('YOU LOST')
            },500)
        }
    }

    endGame = (text)=>{
        // kill top row
        this.interpolatedValue1 = -300
        this.setState({})
        // show end game screen
        this.props.navigator.showLightBox({
            screen:'EndGame',
            passProps: {
                headerText: text,
                turn: this.state.turn-1
            }
        })
    }

    addTopRowToHistory = (callback)=>{
        let new_row = Object.assign({}, this.state.topRow)
        new_numbers = this.state.topRow.numbers.slice()
        new_row.hints = this.getHints(this.state.topRow.numbers, this.GOAL_NR)

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

    newTurn = ()=>{
        this.deleteButton(()=>{
            this.animate(()=>{
                this.addTopRowToHistory(()=>{
                    // turn is finished
                    this.checkForEndGame(this.state.history[0].hints)
                })
            })
        })
    }

    onNumberPressCallback = (nr_index, new_number)=>{
        this.changeNumber(nr_index,new_number)
    }

    onNumberLongPressCallback = (nr_index)=>{
        this.props.navigator.showLightBox({
            screen:'SelectNumber',
            passProps: {
                index: nr_index,
                numbers: this.state.topRow.numbers.slice(),
                changeNumber: this.changeNumber
            },
            style: {
                backgroundBlur: 'dark'
            }
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

    onTimeIsUp = (startTimer)=>{
        this.newTurn()
        startTimer()
    }

    showHelp = ()=>{
        this.props.navigator.showModal({
            screen: 'Help'
        })
    }

    render(){
        return (
            <View style={styles.container}>
                
                <View style={styles.header}>

                    <TouchableOpacity onPress={this.exit} style={[styles.headerItem,{flex:1,justifyContent:'flex-start', marginLeft:8}]}>
                        <Icon name='arrow-back' size={FONTS.game.singleplayerGame.icon_back} color={COLORS2.game.singleplayerGame.icon_back}/>
                    </TouchableOpacity>
                    
                    <View style={styles.headerItem}>
                        <View style={[styles.headerItem,{justifyContent:'flex-end'}]}>
                            <Icon name='filter-none' size={FONTS.game.singleplayerGame.icon_turn} color={COLORS2.game.singleplayerGame.icon_turn} style={{marginLeft:5}} />
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
                                            <Icon name='timer' size={FONTS.game.singleplayerGame.icon_timer} color={COLORS2.game.singleplayerGame.icon_timer} />
                                        </View>
                                        <View style={[styles.headerItem,{justifyContent:'flex-start'}]}>
                                            <TimerCountdown initialSeconds={this.props.timer} callback={this.onTimeIsUp}/>
                                        </View>
                                    </View>
                                )
                            } else {
                                return <Icon name='timer-off' size={FONTS.game.singleplayerGame.icon_timer_off} color={COLORS2.game.singleplayerGame.icon_timer_off} style={{alignSelf:'center', marginRight:10}} />
                            }
                        })() }
                    </View>
                    
                    <TouchableOpacity onPress={this.showHelp} style={[styles.headerItem,{flex:1}]}>
                        <Icon name='help-outline' size={FONTS.game.singleplayerGame.icon_help} color={COLORS2.game.singleplayerGame.icon_help} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.gameWindow, {
                    marginRight: CONST.ROW_BONUS_MARGIN + (5-this.props.numbersLength)*CONST.CUBE_SIZE/2,
                    marginLeft: CONST.ROW_BONUS_MARGIN + (5-this.props.numbersLength)*CONST.CUBE_SIZE/2
                }]}>

                    <View style={[styles.gg_bg_block, {
                        left: 0, top: 0,
                        width: (this.props.numbersLength+2)*CONST.CUBE_SIZE,
                        height: CONST.CUBE_SIZE*2,
                    }]} />
                
                    <Animated.View style={{
                        transform: [
                            { translateY: this.interpolatedValue1 }
                        ]
                    }}>
                        <Row index={0} row={this.state.topRow} button={this.state.button} onButtonPress={this.newTurn} newStyleLeft={{backgroundColor:COLORS2.game.singleplayerGame.top_row_bg}} newStyleRight={{backgroundColor:COLORS2.game.singleplayerGame.top_row_bg}} onNumberPressCallback={this.onNumberPressCallback} onNumberLongPressCallback={this.onNumberLongPressCallback} />
                    </Animated.View>

                    { (()=>{
                            if(this.GAME_OVER){
                                return (
                                    <View style={[styles.gg_bg_block, {
                                        left: 0, top: 0,
                                        width: (this.props.numbersLength+2)*CONST.CUBE_SIZE,
                                        height: CONST.CUBE_SIZE*2,
                                    }]}>
                                        <CommunityIcon name='bullseye' size={FONTS.game.singleplayerGame.icon_bullseye} color={COLORS2.game.singleplayerGame.icon_bullseye}/>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS2.game.singleplayerGame.background
    },
    header: {
        flexDirection: 'row',
        backgroundColor: COLORS2.game.singleplayerGame.header_bg,
        height: CONST.CUBE_SIZE
    },
    headerItem: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNumber:{
        fontSize: FONTS.game.singleplayerGame.turn_text,
        fontFamily: FONTS.family,
        color: COLORS2.game.singleplayerGame.turn_text
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
        backgroundColor: COLORS2.game.singleplayerGame.game_window_bg,
        marginTop: CONST.GAME_WINDOW_MARGIN,
        marginBottom: CONST.GAME_WINDOW_MARGIN
        // alignItems: 'center'
    },
    gg_bg_block: {
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: COLORS2.game.singleplayerGame.end_bg,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ggText: {
        marginLeft: 10,
        fontSize: FONTS.game.singleplayerGame.end_numbers_text,
        fontFamily: FONTS.family,
        color: COLORS2.game.singleplayerGame.end_text
    }
})

export default SingleplayerScreen