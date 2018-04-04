import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, width, height, CONST, FONTS, COLORS2,SIZES } from '../utils/constants'
import { on, off, emit_find_game, emit_cancel_find } from '../utils/socket_io'

class FindingGameIndicator extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    componentDidMount(){
        emit_find_game(this.props.username,this.props.user_count)
        on('room_was_created',()=>{
            this.props.navigator.dismissModal({animationType: 'none'})
            setTimeout(()=>{
                this.showReadyModal()
            },500)
        })
    }

    componentWillUnmount(){
        off('room_was_created')
    }

    forceClose = ()=>{
        emit_cancel_find(this.props.username)
        setTimeout(()=>{
            this.props.navigator.dismissModal({animationType: 'none'})
        },10)
    }

    showReadyModal = ()=>{
        this.props.navigator.showModal({
            screen: 'ReadyModal',
            passProps: {
                startGame: this.multiplayer_startGame,
                username: this.props.username,
                startGame: this.props.startGame,
            },
            animationType: 'none'
        })
    }

    render(){
        return (
            <TouchableOpacity style={styles.container} onPress={this.forceClose}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={[styles.text,{color: COLORS2.findingGame.text}]}>
                            looking for game...
                        </Text>
                        <ActivityIndicator 
                            size = {FONTS.findingGame.circle_size}
                            color = {COLORS2.findingGame.circle}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        height: SIZES.findingGame.modal.height,
        width: SIZES.findingGame.modal.width,
        backgroundColor: COLORS2.findingGame.modal_bg,
        borderRadius: 5,
        marginBottom: SIZES.findingGame.modal.marginBottom,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex:1,
        backgroundColor: COLORS2.findingGame.background,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: FONTS.family,
        fontSize: FONTS.findingGame.text_size
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.findingGame.header.height,
        width: SIZES.findingGame.header.width
    }
  })

export default FindingGameIndicator