import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import Cube from '../components/Cube'
import Row from '../components/Row'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CONST, COLORS, width, height } from '../utils/constants'

class HelpModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        pageNumber:1
    }

    onLeftPress = ()=>{
        if(this.state.pageNumber==1){
            this.props.navigator.dismissModal()
        } else 
        if(this.state.pageNumber==2){
            this.setState({pageNumber:1})
        }
    }

    onRightPress = ()=>{
        if(this.state.pageNumber==1){
            this.setState({pageNumber:2})
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.modal}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.onLeftPress} style={{flex:1}}>
                            <Icon name='arrow-back' size={40} color={COLORS.bg} style={{marginLeft:7, marginRight:0}} />
                        </TouchableOpacity>
                        <View style={[{flex:4},styles.center]}>
                            <Text style={{color:'white',fontFamily:'JordanBoldGrunge',fontSize:30}}>
                                how to play
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.onRightPress} style={{flex:1}}>
                            <Icon name='arrow-forward' size={40} color={COLORS.bg} style={{marginRight:0, marginLeft:0}} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.body}>

                        {(()=>{
                            switch(this.state.pageNumber){
                                case 1:
                                    return (
                                        <View style={{margin:7}}>
                                            <Text style={[styles.text,{lineHeight:43}]}>
                                                You need to crack
                                                <Text style={{color:'yellow'}}> 4 numbers </Text>
                                                to break into the safe.
                                                Luckily safe has
                                                <Text style={{color:'orange'}}> hint mechanism</Text>.
                                                Each time you guess a password it shows how correct your guess was.
                                                But be carefull, after several tries the safe
                                                <Text style={{color:'red'}}> locks permanently</Text>.
                                            </Text>
                                        </View>
                                    )
                                    break
                                case 2:
                                    return (
                                        <View>
                                            <View style={styles.row}>
                                                <Text style={styles.text}> Top row is your guess</Text>
                                            </View>
                                            
                                            <View style={styles.row}>
                                                <Row index={999} row={{key:0,numbers:[1,2,3,4],hints:false}} button={()=>{}} onButtonPress={()=>{}} onNumberPressCallback={()=>{}} />
                                            </View>

                                            <View style={styles.row}>
                                                <Text style={styles.text}> Hold</Text>
                                                <Cube key={998} index={998} number={2} row_numbers={[1,2,3,4]} touchable={true} onNumberPressCallback={()=>{}}/>
                                                <Text style={styles.text}>to change input</Text>
                                            </View>
                                            
                                            <View style={styles.row}>
                                                <Text style={styles.text}> To guess press </Text>
                                                <TouchableOpacity onPress={()=>{}} style={styles.btn}>
                                                    <Icon name='arrow-drop-down' size={65} style={{marginTop:0}} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.row}>
                                                <Text style={styles.text}> Rows below are history</Text>
                                            </View>
                                            
                                            <View style={styles.row}>
                                                <Text style={styles.text}> History has hints</Text>
                                                <Cube index={997} number={1} newStyle={styles.hint1} />
                                                <Cube index={996} number={0} newStyle={styles.hint2} />
                                            </View>

                                            <View style={styles.row}>
                                                <Cube index={995} number={1} newStyle={styles.hint1} />
                                                <Text style={styles.text}> - how many numbers</Text>
                                            </View>

                                            <View style={styles.row}>
                                                <Text style={styles.text}> are correct. </Text>
                                                <Cube index={996} number={0} newStyle={styles.hint2} />
                                                <Text style={styles.text}> - how</Text>
                                            </View>

                                            <View style={styles.row}>
                                                <Text style={styles.text}> many are in right place</Text>
                                            </View>

                                        </View>
                                    )
                                    break
                            }
                        })()}

                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: 500,
        width: 320,
        backgroundColor: COLORS.helpBg
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.header,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 8,
        margin: 5,
        marginTop: 0,
        marginBottom: 0
    },
    text: {
        fontSize: 32,
        fontFamily: 'NanumPenScript',
        color: 'white',
        textAlign: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row:{
        height:CONST.CUBE_SIZE,
        flexDirection:'row',
        alignItems:'center'
    },
    btn: {
        margin: CONST.CUBE_MARGIN,
        width: CONST.CUBE_SIZE*2 - CONST.CUBE_MARGIN*2, 
        height: CONST.CUBE_SIZE - CONST.CUBE_MARGIN*2, 
        backgroundColor: COLORS.game.button,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hint1: {
        width: CONST.CUBE_SIZE - CONST.CUBE_MARGIN*1.5,
        marginRight: CONST.CUBE_MARGIN/2,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: COLORS.game.hints
    },
    hint2: {
        width: CONST.CUBE_SIZE - CONST.CUBE_MARGIN*1.5,
        marginLeft: CONST.CUBE_MARGIN/2,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: COLORS.game.hints
    }
  })

export default HelpModal