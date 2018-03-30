import React from 'react'
import { AppRegistry, StyleSheet, FlatList, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, Button, TouchableOpacity } from 'react-native'
import Cube from './Cube'
import { CONST, COLORS, FONTS, COLORS2, SIZES } from '../utils/constants'
import Icon from 'react-native-vector-icons/MaterialIcons'

class Row extends React.Component {
    /* PROPS
    ! row (object{hints(2# or false),numbers(4#)}) = row represented by numbers
    ! index (number)
    button (boolean)
    onButtonPress (function) = onPress button
    onNumberPressCallback (function(index,number)) = callback when individual number is pressed
    onNumberLongPressCallback

    /* STATES
    None
    
    /* VARIABLES
    cubesArr [](objects{key})
    row (object{hints(2# or false),numbers(4#)}) = row in numbers

    */
    
    row = this.props.row


    //cubesArr = [0,1,2,3].map(i =>{return {key:i,row:this.props.row}})


    getNumbers = ()=>{
        switch(this.props.row.numbers.length){
            case 3:
                this.cubesArr = [0,1,2].map(i =>{return {key:i,row:this.props.row}})
                break
            case 4:
                this.cubesArr = [0,1,2,3].map(i =>{return {key:i,row:this.props.row}})
                break
            case 5:
                this.cubesArr = [0,1,2,3,4].map(i =>{return {key:i,row:this.props.row}})
                break
        }

        return (
            <FlatList horizontal = {true}
                    data = {this.cubesArr}
                    extraData = {this.cubesArr}
                    renderItem = {({item})=>{
                        return <Cube key={item.key} index={item.key} number={item.row.numbers[item.key]} row_numbers={item.row.numbers} touchable={this.props.button} onNumberPressCallback={this.props.onNumberPressCallback} onNumberLongPressCallback={this.props.onNumberLongPressCallback} />
                    }}
            />
        )
    }

    getRightSide = ()=>{
        if(!this.props.button && this.row.hints){
            return (
                <View style={{flexDirection: 'row'}}>
                    <Cube index={0} number={this.row.hints[0]} newStyle={styles.hint1} />
                    <Cube index={1} number={this.row.hints[1]} newStyle={styles.hint2} />
                </View>
            )
        } else 
        if(this.props.button && !this.row.hints){
            return (
                <TouchableOpacity onPress={this.props.onButtonPress} style={styles.btn}>
                    <Icon name='arrow-drop-down' size={FONTS.row.icon_arrow_bottom} style={{marginTop:0}} />
                </TouchableOpacity>
            )
        } else {
            return //
        }
    }

    // keyboard-arrow-down
    // arrow-drop-down-circle
    // arrow-drop-down

    render(){
        return (
            <View style={styles.row}>
                <View style={[styles.leftSide,{flex:this.props.numbersLength}]}>
                    { this.getNumbers() }
                </View>
                <View style={styles.rightSide}>
                    { this.getRightSide() }
                </View>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    row: {
        // flex: 1,
        flexDirection: 'row'
    },
    leftSide: {
        // flexDirection: 'row',
        flex: 4, // overrided in component class by props.numbersLength
        backgroundColor: COLORS2.row.leftPart.background
    },
    rightSide: {
        flex: 2, // 2 cubes
        backgroundColor: COLORS2.row.rightPart.background,
        alignItems: 'center'
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

export default Row