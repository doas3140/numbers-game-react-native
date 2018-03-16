import React from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity, Button, ScrollView } from 'react-native';
import Cube from './Cube'
import Row from './Row'
import { createAnimation } from '../utils/animations'
import { CONST } from '../utils/constants'


class Game extends React.Component {
    /* PROPS
    None
    
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

    
    state = {
        topRow: {key:0,hints:false,numbers:[1,2,3,4]},
        history: [],
        button: true,
        animatedValueIncrease: new Animated.Value(0)
    }

    interpolatedValue1 = this.state.animatedValueIncrease.interpolate({
        inputRange: [0,1],
        // outputRange: [0, CONST.CUBE_SIZE*2] //if first row starts at top
        outputRange: [CONST.CUBE_SIZE*1, CONST.CUBE_SIZE*3]
    })

    interpolatedValue2 = this.state.animatedValueIncrease.interpolate({
        inputRange: [0,1],
        // outputRange: [0, CONST.CUBE_SIZE] //if first row starts at top
        outputRange: [CONST.CUBE_SIZE*1, CONST.CUBE_SIZE*2]
    })

    generateRandomNumbers = ()=>{
        let randomNumber = ()=>{
            return Math.ceil(Math.random()*9)
        }
        let randomNumbers = []
        while(randomNumbers.length != 4){
            let random_number = randomNumber()
            if(!randomNumbers.includes(random_number)){
                randomNumbers.push(random_number)
            }
        }
        return randomNumbers
    }

    componentDidMount(){
        this.GOAL_NR = this.generateRandomNumbers()
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
        if(hints[0] == 4 && hints[1] == 4){
            this.GAME_OVER = true
            // GEGE
        }
    }

    addTopRowToHistory = (callback)=>{
        let new_row = Object.assign({}, this.state.topRow)
        new_numbers = this.state.topRow.numbers.slice()
        new_row.hints = this.getHints(this.state.topRow.numbers, this.GOAL_NR)
        this.checkForEndGame(new_row.hints)

        this.state.history.unshift({key:new_row.key, hints:new_row.hints, numbers:new_numbers})
        console.log('Test: ', this.state.topRow === this.state.history[0])
        this.state.topRow.key += 1
        this.setState({
            button: true,
            history: this.state.history
        })
        this.state.animatedValueIncrease.setValue(0)
        callback()
    }

    newTurn = ()=>{
        console.log('======= NEW TURN ==============')
        this.deleteButton(()=>{
            this.animate(()=>{
                this.addTopRowToHistory(()=>{
                    // turn is finished
                })
            })
        })
    }

    onNumberPressCallback = (nr_index, new_number)=>{
        this.state.topRow.numbers[nr_index] = new_number
        this.setState({
            topRow: this.state.topRow
        })
    }

    render(){
        return (
            <View style={styles.gameWindow}>
            
                <Animated.View style={{
                    transform: [
                        { translateY: this.interpolatedValue1 }
                    ]
                }}>
                    <Row index={0} row={this.state.topRow} button={this.state.button} onButtonPress={this.newTurn} onNumberPressCallback={this.onNumberPressCallback} />
                </Animated.View>

                <Animated.View style={[{
                    transform: [
                        { translateY: this.interpolatedValue2 }
                    ]
                }, styles.history]}>

                    <FlatList styles={styles.history}
                            //scrollEnabled = {false}
                            data = {this.state.history}
                            extraData = {this.state}
                            renderItem = {({item})=>{
                                return <Row key={item.key} index={item.key} row={item} />
                            }}
                    />
                
                </Animated.View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    history: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0
    },
    gameWindow: {
        flex: 1,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        backgroundColor: '#cecece',
        margin: CONST.GAME_WINDOW_MARGIN,
        // alignItems: 'center'
    }
})

export default Game