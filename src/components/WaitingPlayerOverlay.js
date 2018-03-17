import React from 'react'
import { AppRegistry, ActivityIndicator, Modal, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native'
import { CONST, width, COLORS } from '../utils/constants'

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
                            <Text style={{color:COLORS.button, fontSize: 27}}>
                                {this.props.username}
                            </Text>
                            "
                        </Text>
                        <ActivityIndicator 
                            size = 'large'
                            color = '#ededed'
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
        marginTop: CONST.CUBE_SIZE + CONST.GAME_WINDOW_MARGIN,
        position: 'absolute'
    },
    insideModal: {
        flexDirection: 'row',
        height: CONST.CUBE_SIZE,
        width: width,
        backgroundColor: COLORS.header,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        fontFamily: 'JordanBoldGrunge',
        color: COLORS.game.gameWindow
    }
})

export default WaitingPlayerModal