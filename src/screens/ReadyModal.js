import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, width, height, CONST } from '../utils/constants'
import { on, emit_ready_to_play } from '../utils/socket_io'

class ReadyModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        pressed: false
    }

    componentDidMount(){
        setTimeout(()=>{
            this.gameWasntCreated()
        }, CONST.READY_MODAL_LIFETIME)

        on('start_game',()=>{
            this.props.navigator.dismissLightBox()
            this.props.startGame()
        })
    }

    gameWasntCreated = ()=>{
        this.props.navigator.dismissLightBox()
    }

    onReadyPress = ()=>{
        emit_ready_to_play(this.props.username)
        this.setState({
            pressed: true
        })
    }

    render(){
        return (
            <View style={styles.container}>
                {(()=>{
                    if(!this.state.pressed){
                        return (
                            <View style={styles.modal}>
                                <View style={styles.header}>
                                    <Text style={[styles.text,{fontSize:24, color: 'white'}]}>
                                        your game is ready
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.button} onPress={this.onReadyPress} >
                                    <Text style={styles.text}>
                                        i'm ready
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return (
                            <View style={styles.modal}>
                                <View style={styles.header}>
                                    <Text style={[styles.text,{fontSize:24, color: 'white'}]}>
                                        waiting for others
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.button} >
                                        <ActivityIndicator 
                                            size = 'large'
                                            color = {COLORS.c1}
                                        />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000AA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: 140,
        width: 260,
        backgroundColor: COLORS.c1,
        borderRadius: 5,
        marginBottom: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: COLORS.button,
        height: 80,
        width: 200,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: COLORS.fontDark,
        fontFamily: 'JordanBoldGrunge',
        fontSize: 40
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 230,
        marginBottom: 10
    }
  })

export default ReadyModal