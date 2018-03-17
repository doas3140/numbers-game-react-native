import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, width, height, CONST } from '../utils/constants'
import { on, emit_ready_to_play } from '../utils/socket_io'

class FindingGameIndicator extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    componentDidMount(){
        emit_find_game(this.props.username,this.props.numbersLength,this.props.timer)
        on('room_was_created',()=>{
            this.props.navigator.dismissLightBox()
            callback()
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