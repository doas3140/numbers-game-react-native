import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated, Easing, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CONST, COLORS, FONTS, width, height, COLORS2 } from '../utils/constants'
import { createAnimation } from '../utils/animations'

class EndGameModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        animVal1: new Animated.Value(0), // gg text
        animVal2: new Animated.Value(0), // turn text
        animVal3: new Animated.Value(0), // button left
        animVal4: new Animated.Value(0), // button right
        animVal5: new Animated.Value(0), // username
    }

    interVal1 = this.state.animVal1.interpolate({ inputRange: [0,1],
        outputRange: [0, 200] }) // starts at -100
    interVal2 = this.state.animVal2.interpolate({ inputRange: [0,1],
        outputRange: [0, 300] }) // starts at -100
    interVal3 = this.state.animVal3.interpolate({ inputRange: [0,1],
        outputRange: [0, 300] }) // starts at -100
    interVal4 = this.state.animVal4.interpolate({ inputRange: [0,1],
        outputRange: [0, -300] }) // starts at -100
    interVal5 = this.state.animVal5.interpolate({ inputRange: [0,1],
        outputRange: [0, 500] }) // starts at -100

    componentDidMount(){
        // First animation
        this.state.animVal1.setValue(0)
        this.state.animVal2.setValue(0)
        this.state.animVal3.setValue(0)
        this.state.animVal4.setValue(0)
        this.state.animVal5.setValue(0)
        
        anim1 = createAnimation(Value=this.state.animVal1, duration=1000, easing=Easing.bounce, delay=500)
        anim2 = createAnimation(Value=this.state.animVal2, duration=300, easing=Easing.ease)
        anim3 = createAnimation(Value=this.state.animVal3, duration=700, easing=Easing.bounce)
        anim4 = createAnimation(Value=this.state.animVal4, duration=700, easing=Easing.bounce)
        anim5 = createAnimation(Value=this.state.animVal5, duration=300, easing=Easing.ease)
        
        Animated.sequence([anim1,anim2,anim5,anim3,anim4]).start()
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
                    {this.props.headerText}
                </Animated.Text>

                <Animated.Text style={[styles.turnText,{
                    transform: [ { translateX: this.interVal2 } ]
                }]}>
                    TURNS: {this.props.turn}
                </Animated.Text>
                
                {(()=>{
                    if(this.props.username){
                        return (
                            <Animated.Text style={[styles.usernameText,{
                                transform: [ { translateX: this.interVal5 } ]
                            }]}>
                                {this.props.username} WON
                            </Animated.Text>
                        )
                    } else { return null }
                })()}

                <Animated.View style={[styles.btn1,{
                    transform: [ { translateX: this.interVal3 } ]
                }]}>
                    <TouchableOpacity onPress={this.exit}>
                        <Icon name='home' size={FONTS.endGame.icon1} />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.btn2,{
                    transform: [ { translateX: this.interVal4 } ]
                }]}>
                    <TouchableOpacity>
                        <TouchableOpacity onPress={this.close}>
                            <Icon name='history' size={FONTS.endGame.icon2} />
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
        backgroundColor: COLORS2.endGame.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn1: {
        position: 'absolute',
        top: 300,
        left: width/2 - 80 - 20 - 300, // first nr - width, second - marginRight, third - offset
        height: 60,
        width: 80,
        backgroundColor: COLORS2.endGame.button1_bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    btn2: {
        position: 'absolute',
        top: 300,
        right: width/2 - 80 - 20 - 300, // first nr - width, second - marginLeft, third - offset
        height: 60,
        width: 80,
        backgroundColor: COLORS2.endGame.button2_bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    ggText: {
        position: 'absolute',
        top: -100,
        color: COLORS2.endGame.header_text,
        fontFamily: FONTS.family,
        fontSize: FONTS.endGame.header_text,
    },
    turnText: {
        position: 'absolute',
        top: 230,
        left: width/2 - 160/2 - 300, // first nr - width, second - offset
        // left: -170,
        color: COLORS2.endGame.text,
        fontFamily: FONTS.family,
        fontSize: FONTS.endGame.turn_text,
    },
    usernameText: {
        position: 'absolute',
        top: 175,
        left: width/2 - 300/2 - 500, // first nr - width, second - offset
        color: COLORS2.endGame.username_text,
        fontFamily: FONTS.family,
        fontSize: FONTS.endGame.username_text,
    }
  })

export default EndGameModal