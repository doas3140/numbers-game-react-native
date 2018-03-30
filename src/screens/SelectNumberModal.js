import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import Cube from '../components/Cube'
import Row from '../components/Row'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CONST, COLORS, width, height, nr2color_Light, FONTS, COLORS2, SIZES } from '../utils/constants'

class SelectNumberModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    onNumberPress = (new_number)=>{
        this.props.navigator.dismissLightBox()
        this.props.changeNumber(this.props.index,new_number)
    }

    numbers = this.props.numbers.filter(e => e != this.props.numbers[this.props.index])

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.modal}>

                    <View style={{flexDirection:'row'}}>
                        {(()=>{
                            if(!this.numbers.includes(1)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(1)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(1)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {1} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                        {(()=>{
                            if(!this.numbers.includes(2)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(2)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(2)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {2} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                        {(()=>{
                            if(!this.numbers.includes(3)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(3)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(3)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {3} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                    </View>

                    <View style={{flexDirection:'row'}}>
                        {(()=>{
                            if(!this.numbers.includes(4)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(4)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(4)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {4} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                        {(()=>{
                            if(!this.numbers.includes(5)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(5)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(5)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {5} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                        {(()=>{
                            if(!this.numbers.includes(6)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(6)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(6)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {6} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                    </View>

                    <View style={{flexDirection:'row'}}>
                        {(()=>{
                            if(!this.numbers.includes(7)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(7)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(7)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {7} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                        {(()=>{
                            if(!this.numbers.includes(8)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(8)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(8)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {8} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                        {(()=>{
                            if(!this.numbers.includes(9)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(9)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(9)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {9} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
                            }
                        })()}
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        {(()=>{
                            if(!this.numbers.includes(0)){
                                return <TouchableOpacity style={[styles.cube, {backgroundColor:nr2color_Light(0)}, this.props.newStyle]} onPress={()=>{this.onNumberPress(0)}}>
                                    <View style={styles.numberView}>
                                        <Text style={styles.number}> {0} </Text>
                                    </View>
                                </TouchableOpacity>
                            } else {
                                return <View style={[styles.cube, {backgroundColor:COLORS2.game.selectNumber.empty_cube}]} />
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
    //   backgroundColor: COLORS2.game.selectNumber.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: SIZES.selectNumber.height,
        width: SIZES.selectNumber.width,
        padding: SIZES.selectNumber.padding,
        borderRadius: SIZES.selectNumber.borderRadius,
        backgroundColor: COLORS2.game.selectNumber.modal_bg
    },
    cube: {
        height: SIZES.cube.height,
        width: SIZES.cube.width,
        borderRadius: SIZES.cube.borderRadius,
        margin: SIZES.cube.margin,
    },
    number: {
        fontFamily: FONTS.family,
        fontSize: FONTS.row.cube_text,
        color: COLORS2.game.selectNumber.text
    },
    numberView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  })

export default SelectNumberModal