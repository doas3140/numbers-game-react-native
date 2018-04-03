import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import Cube from '../components/Cube'
import Row from '../components/Row'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CONST, COLORS, width, height, FONTS, COLORS2, SIZES } from '../utils/constants'

class HelpModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }
    totalPages = 2

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

    getHeader = (pageNumber)=>{
        switch(pageNumber){
            case 1:
                return 'introduction'
                break
            case 2:
                return 'how to play'
                break
            default:
                return ''
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.modal}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.onLeftPress} style={{flex:1}}>
                            <Icon name='arrow-back' size={FONTS.help.icon_back} color={COLORS2.help.icon_back} style={{marginLeft:7, marginRight:0}} />
                        </TouchableOpacity>
                        <View style={[{flex:4},styles.center]}>
                            <Text style={{color:COLORS2.help.header_text,fontFamily:FONTS.family,fontSize:FONTS.help.header}}>
                                { this.getHeader(this.state.pageNumber) }
                            </Text>
                        </View>
                        {(()=>{
                            if(this.state.pageNumber == this.totalPages){
                                return <View style={{flex:1}}/>
                            } else {
                                return (
                                    <TouchableOpacity onPress={this.onRightPress} style={{flex:1}}>
                                        <Icon name='arrow-forward' size={FONTS.help.icon_forward} color={COLORS2.help.icon_forward} style={{marginRight:0, marginLeft:0}} />
                                    </TouchableOpacity>
                                )
                            }
                        })()}
                    </View>

                    <View style={styles.body}>

                        {(()=>{
                            switch(this.state.pageNumber){
                                case 1:
                                    return (
                                        <View style={{margin:7}}>
                                            <Text style={[styles.text,{lineHeight:FONTS.help.page1.line_height}]}>
                                                You need to crack
                                                <Text style={{color:COLORS2.help.page1.subtext1}}> 4 numbers </Text>
                                                to break into the safe.
                                                Luckily safe has
                                                <Text style={{color:COLORS2.help.page1.subtext2}}> hint mechanism</Text>.
                                                Each time you guess a password it shows how correct your guess was.
                                                But be carefull, after several tries the safe
                                                <Text style={{color:COLORS2.help.page1.subtext3}}> locks permanently</Text>.
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
                                                    <Icon name='arrow-drop-down' size={FONTS.row.icon_arrow_bottom} style={{marginTop:0}} />
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
      backgroundColor: COLORS2.help.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: SIZES.help.height,
        width: SIZES.help.width,
        backgroundColor: COLORS2.help.modal_bg
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS2.help.header_bg,
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
        fontSize: FONTS.help.text_size,
        fontFamily: FONTS.help.family,
        color: COLORS2.help.text,
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
        margin: SIZES.row.button.margin,
        width: SIZES.row.button.width, 
        height: SIZES.row.button.height, 
        backgroundColor: COLORS2.row.rightPart.button_bg,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hint1: {
        width: SIZES.row.hint.width,
        marginRight: SIZES.row.hint.margin,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: COLORS2.row.rightPart.hint1_bg
    },
    hint2: {
        width: SIZES.row.hint.width,
        marginLeft: SIZES.row.hint.margin,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: COLORS2.row.rightPart.hint2_bg
    }
  })

export default HelpModal