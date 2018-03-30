import React from 'react'
import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native'
import { CONST, COLORS, FONTS, COLORS2, SIZES } from '../utils/constants'
import { nr2color_Dark, nr2color_Light } from '../utils/constants'

class Cube extends React.Component {
    /* PROPS
    ! touchable (boolean) = (touchable number) : (bg color number)
    row_numbers [](4 numbers) = all numbers from the same row
    ! number (number) = showing number
    onNumberPressCallback (function) = callback
    onNumberLongPressCallback
    ! index (number) = row index
    newStyle (style) = overrites style with new style

    /* STATES
    number (number)
    color (string)
    
    /* VARIABLES
    nr2color (function) = map function
    index (number) = row index
    
    */
    state = {
        color: 'white'
    }
    index = this.props.index

    onNumberPress = ()=>{
        // console.log('Numbers in a row: ', this.props.row_numbers)
        // Add until there are no same numbers in row
        let new_number = this.props.number
        while(true){
            new_number = this.addNumber(new_number)
            // console.log(new_number)
            if(!this.props.row_numbers.includes(new_number)){
                break
            }
        }
        this.props.onNumberPressCallback(this.index, new_number)
    }

    onNumberLongPress = ()=>{
        this.props.onNumberLongPressCallback(this.index)
    }

    // Adds some number to this.state.number
    addNumber = (number)=>{
        if(number < 9){
            number = number + 1
        } else
        if(this.index != 0){
            number = 0
        }
        else {
            number = 1
        }
        return number
    }

    getCubeComponent = ()=>{
        // console.log(this.props.index, 'Cube toucheble: ', this.props.touchable)

        if(this.props.touchable){
            this.nr2color = nr2color_Light
            this.state.color = this.nr2color(this.props.number)
            return (
                <TouchableOpacity style={[styles.cube, {backgroundColor:this.state.color}, this.props.newStyle]} onPress={this.onNumberPress} onLongPress={this.onNumberLongPress}>
                    <View style={styles.numberView}>
                        <Text style={styles.number}> {this.props.number} </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            this.nr2color = nr2color_Dark
            this.state.color = this.nr2color(this.props.number)
            return (
                <View style={[styles.cube, {backgroundColor:this.state.color}, this.props.newStyle]}>
                    <View style={styles.numberView}>
                        <Text style={styles.number}> {this.props.number} </Text>
                    </View>
                </View>
            )
        }
    }

    render(){
        return this.getCubeComponent()
    }
}

const styles = StyleSheet.create({
    cube: {
        height: SIZES.cube.height,
        width: SIZES.cube.width,
        borderRadius: SIZES.cube.borderRadius,
        margin: SIZES.cube.margin,
    },
    number: {
        fontFamily: FONTS.family,
        fontSize: FONTS.row.cube_text,
        color: COLORS2.row.leftPart.cube_text
    },
    numberView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Cube