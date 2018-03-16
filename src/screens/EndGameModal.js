import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated, Easing, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CONST, COLORS, width, height } from '../utils/constants'
import { createAnimation } from '../utils/animations'

class EndGameModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        animVal1: new Animated.Value(0),
        animVal2: new Animated.Value(0),
        animVal3: new Animated.Value(0),
        animVal4: new Animated.Value(0)
    }

    //
    interVal1 = this.state.animVal1.interpolate({ inputRange: [0,1],
        outputRange: [0, 200] }) // starts at -100
    //
    interVal2 = this.state.animVal2.interpolate({ inputRange: [0,1],
        outputRange: [0, 300] }) // starts at -100
    //
    interVal3 = this.state.animVal3.interpolate({ inputRange: [0,1],
        outputRange: [0, 300] }) // starts at -100
    //
    interVal4 = this.state.animVal4.interpolate({ inputRange: [0,1],
        outputRange: [0, -300] }) // starts at -100


    componentDidMount(){
        // First animation
        this.state.animVal1.setValue(0)
        this.state.animVal2.setValue(0)
        this.state.animVal3.setValue(0)
        this.state.animVal4.setValue(0)
        
        anim1 = createAnimation(Value=this.state.animVal1, duration=1000, easing=Easing.bounce, delay=500)
        anim2 = createAnimation(Value=this.state.animVal2, duration=300, easing=Easing.ease)
        anim3 = createAnimation(Value=this.state.animVal3, duration=700, easing=Easing.bounce)
        anim4 = createAnimation(Value=this.state.animVal4, duration=700, easing=Easing.bounce)
        
        Animated.sequence([anim1,anim2,anim3,anim4]).start()
    }

    exit = ()=>{
        this.props.navigator.pop()
        this.props.navigator.dismissLightBox()
    }

    close = ()=>{
        this.props.navigator.dismissLightBox()
    }

    render(){
        return (
            <View style={styles.container}>
                <Animated.Text style={[styles.ggText,{
                    transform: [ { translateY: this.interVal1 } ]
                }]}>
                    GOOD GAME
                </Animated.Text>

                <Animated.Text style={[styles.turnText,{
                    transform: [ { translateX: this.interVal2 } ]
                }]}>
                    TURNS: {this.props.turn}
                </Animated.Text>

                <Animated.View style={[styles.btn1,{
                    transform: [ { translateX: this.interVal3 } ]
                }]}>
                    <TouchableOpacity onPress={this.exit}>
                        <Icon name='home' size={50} />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.btn2,{
                    transform: [ { translateX: this.interVal4 } ]
                }]}>
                    <TouchableOpacity>
                        <TouchableOpacity onPress={this.close}>
                            <Icon name='history' size={50} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn1: {
        position: 'absolute',
        top: 250,
        left: width/2 - 80 - 20 - 300, // first nr - width, second - marginRight, third - offset
        height: 60,
        width: 80,
        backgroundColor: COLORS.button,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    btn2: {
        position: 'absolute',
        top: 250,
        right: width/2 - 80 - 20 - 300, // first nr - width, second - marginLeft, third - offset
        height: 60,
        width: 80,
        backgroundColor: COLORS.button,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    ggText: {
        position: 'absolute',
        top: -100,
        color: COLORS.button,
        fontFamily: 'JordanBoldGrunge',
        fontSize: 60,
    },
    turnText: {
        position: 'absolute',
        top: 180,
        left: width/2 - 160/2 - 300, // first nr - width, second - offset
        // left: -170,
        color: COLORS.button,
        fontFamily: 'JordanBoldGrunge',
        fontSize: 40,
    }
  })

export default EndGameModal