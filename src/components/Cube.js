import React from 'react'
import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native'
import { CONST, COLORS } from '../utils/constants'
import { nr2color_Dark, nr2color_Light } from '../utils/constants'

class Cube extends React.Component {
    /* PROPS
    ! touchable (boolean) = (touchable number) : (bg color number)
    row_numbers [](4 numbers) = all numbers from the same row
    ! number (number) = showing number
    onNumberPressCallback (function) = callback
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

    // Adds some number to this.state.number
    addNumber = (number)=>{
        if(number < 9){
            number = number + 1
        } else {
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
                <TouchableOpacity style={[styles.cube, {backgroundColor:this.state.color}, this.props.newStyle]} onPress={this.onNumberPress}>
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
        height: CONST.CUBE_SIZE - 2*CONST.CUBE_MARGIN,
        width: CONST.CUBE_SIZE - 2*CONST.CUBE_MARGIN,
        borderRadius: 4,
        margin: CONST.CUBE_MARGIN,
    },
    number: {
        fontFamily: 'JordanBoldGrunge',
        fontSize: CONST.CUBE_TEXT_SIZE,
        // fontWeight: 'bold',
        color: COLORS.fontDark
    },
    numberView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Cube