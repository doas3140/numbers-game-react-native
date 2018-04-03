import React from 'react'
import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS, COLORS2, SIZES } from '../utils/constants'

class MenuTab extends React.Component {
    /* PROPS
    title
    buttonTitle
    options [2](numbers)
    onMainButton (function)
    onOptionsButton1 (function)
    onOptionsButton2 (function)

    /* STATES
    
    /* VARIABLES
    
    */ 

    render(){
        return (
            <View style={styles.container}>
                
                <View style={styles.left}>

                    <View style={styles.title}>
                        <Text style={{fontFamily:FONTS.family, fontSize:FONTS.mainMenu.header, color:COLORS2.mainMenu.menuTab.header_text}} > {this.props.title} </Text>
                    </View>

                    <View style={styles.button}>
                            <TouchableOpacity onPress={this.props.onMainButton}
                                style={{backgroundColor:COLORS2.mainMenu.menuTab.button_bg, flex:1, margin:5, borderRadius:0, alignItems:'center', justifyContent:'center'}} 
                            >
                                <Text style={{fontFamily:FONTS.family, fontSize:FONTS.mainMenu.button, color:COLORS2.mainMenu.menuTab.button_text}} >
                                    {this.props.buttonTitle}
                                </Text>
                            </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.right}>
                    
                    <View style={{backgroundColor:COLORS2.mainMenu.menuTab.rightPart.row1_bg, flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Icon name='view-week' size={FONTS.mainMenu.icon1} color={COLORS2.mainMenu.menuTab.rightPart.icon} />
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={this.props.onOptionsButton1}
                                style={{backgroundColor:COLORS2.mainMenu.menuTab.rightPart.button_bg, flex:1, borderRadius:0, margin:5, alignItems:'center', justifyContent:'center'}}
                            >

                                {(()=>{ let fontSize // for fontsize resize if 'any'
                                    if(this.props.options[0] == 'any'){
                                        fontSize = FONTS.mainMenu.nr_if_any
                                    } else { fontSize = FONTS.mainMenu.nr_else }
                                    return (
                                        <Text style={{fontFamily:FONTS.family, fontSize, color:COLORS2.mainMenu.menuTab.rightPart.text}} >
                                            { this.props.options[0] }
                                        </Text>
                                    )
                                })()}

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{backgroundColor:COLORS2.mainMenu.menuTab.rightPart.row2_bg, flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Icon name='people' size={FONTS.mainMenu.icon2} color={COLORS2.mainMenu.menuTab.rightPart.icon}/>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={this.props.onOptionsButton2}
                                style={{backgroundColor:COLORS2.mainMenu.menuTab.rightPart.button_bg, flex:1, borderRadius:0, margin:5, alignItems:'center', justifyContent:'center'}}
                            >
                                
                                {(()=>{ let fontSize // for fontsize resize if 'any'
                                    if(this.props.options[1] == 'any'){
                                        fontSize = FONTS.mainMenu.nr_if_any
                                    } else { fontSize = FONTS.mainMenu.nr_else }
                                    return (
                                        <Text style={{fontFamily:FONTS.family, fontSize, color:COLORS2.mainMenu.menuTab.rightPart.text}} >
                                            { this.props.options[1] }
                                        </Text>
                                    )
                                })()}

                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

//  <Text style={{fontFamily:'JordanBoldGrunge', fontSize:35, marginTop: 10}} > singleplayer </Text>


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        flex: 1,
        backgroundColor: COLORS2.mainMenu.menuTab.row1_bg,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        backgroundColor: COLORS2.mainMenu.menuTab.row2_bg
    },
    left: {
        flex: 2,
        marginLeft: 8,
        marginRight: 0
    },
    right: {
        flex: 1,
        marginLeft: 3,
        marginRight: 8
    }
})

export default MenuTab