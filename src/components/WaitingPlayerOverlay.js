import React from 'react'
import { AppRegistry, ActivityIndicator, Modal, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native'
import { CONST, width, COLORS, FONTS, COLORS2, SIZES } from '../utils/constants'

class WaitingPlayerModal extends React.Component {
    /* PROPS
    ! modalVisible
    ! username

    /* STATES
    
    /* VARIABLES

    */

    // state = {
    //     modalVisible: this.props.modalVisible
    // }

    getModal = ()=>{
        if(this.props.modalVisible){
            return (
                <View style={styles.modal}>
                    <View style={styles.insideModal}>
                        <Text style={styles.text}> Waiting for "
                            <Text style={{color:COLORS2.game.waitingPlayer.username_text, fontSize: FONTS.game.waitingPlayer.username_size}}>
                                {this.props.username}
                            </Text>
                            "
                        </Text>
                        <ActivityIndicator 
                            size = {FONTS.game.waitingPlayer.circle_size}
                            color = {COLORS2.game.waitingPlayer.circle}
                        />
                    </View>
                </View>
            )
        } else {
            return null
        }
    }

    render(){
        return this.getModal()
    }
}

const styles = StyleSheet.create({
    modal: {
        marginTop: SIZES.waitingPlayer.marginTop,
        position: 'absolute'
    },
    insideModal: {
        flexDirection: 'row',
        height: SIZES.waitingPlayer.height,
        width: SIZES.waitingPlayer.width,
        backgroundColor: COLORS2.game.waitingPlayer.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: FONTS.game.waitingPlayer.text_size,
        fontFamily: FONTS.family,
        color: COLORS2.game.waitingPlayer.text
    }
})

export default WaitingPlayerModal