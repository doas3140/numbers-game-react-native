import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, width, height, CONST } from '../utils/constants'
import { on, off, emit_find_game, emit_cancel_find } from '../utils/socket_io'

class FindingGameIndicator extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    componentDidMount(){
        emit_find_game(this.props.username,this.props.user_count)
        on('room_was_created',()=>{
            this.props.navigator.dismissLightBox()
            setTimeout(()=>{
                this.showReadyModal()
            },500)
        })
    }

    componentWillUnmount(){
        off('room_was_created')
        emit_cancel_find(this.props.username)
    }

    showReadyModal = ()=>{
        this.props.navigator.showModal({
            screen: 'ReadyModal',
            passProps: {
                startGame: this.multiplayer_startGame,
                username: this.props.username,
                startGame: this.props.startGame,
            }
        })
    }

    render(){
        return (
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={[styles.text,{fontSize:24, color: 'white'}]}>
                        looking for game...
                    </Text>
                    <ActivityIndicator 
                        size = 'large'
                        color = 'white'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 80,
        width: 260,
        backgroundColor: COLORS.c1,
        borderRadius: 5,
        marginBottom: 100,
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
        width: 230
    }
  })

export default FindingGameIndicator