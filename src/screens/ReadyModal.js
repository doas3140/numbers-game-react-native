import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, width, height, CONST, FONTS, COLORS2, SIZES } from '../utils/constants'
import { on, off, emit_ready_to_play } from '../utils/socket_io'

class ReadyModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        pressed: false
    }

    componentDidMount(){
        setTimeout(()=>{
            this.notInTime()
        }, CONST.READY_MODAL_LIFETIME)

        on('start_game',()=>{
            this.props.navigator.dismissModal()
            this.props.startGame()
        })
    }

    componentWillUnmount(){
        off('start_game')
    }

    notInTime = ()=>{
        this.props.navigator.dismissModal()
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
                                    <Text style={[styles.text,{fontSize:FONTS.readyModal.text_size, color: COLORS2.readyModal.text}]}>
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
                                    <Text style={[styles.text,{fontSize:FONTS.readyModal.text_size, color: COLORS2.readyModal.text}]}>
                                        waiting for others
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.button} >
                                        <ActivityIndicator 
                                            size = {FONTS.readyModal.circle_size}
                                            color = {COLORS2.readyModal.circle}
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
      backgroundColor: COLORS2.readyModal.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: SIZES.readyModal.modal.height,
        width: SIZES.readyModal.modal.width,
        backgroundColor: COLORS2.readyModal.modal_bg,
        borderRadius: 5,
        marginBottom: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: COLORS2.readyModal.button_bg,
        height: SIZES.readyModal.button.height,
        width: SIZES.readyModal.button.width,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: FONTS.family,
        fontSize: FONTS.readyModal.button_text
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.readyModal.header.height,
        width: SIZES.readyModal.header.width,
        marginBottom: 10
    }
  })

export default ReadyModal