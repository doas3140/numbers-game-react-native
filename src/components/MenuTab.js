import React from 'react'
import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../utils/constants'

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
                        <Text style={{fontFamily:'JordanBoldGrunge', fontSize:30, color:COLORS.fontDark}} > {this.props.title} </Text>
                    </View>

                    <View style={styles.button}>
                            <TouchableOpacity onPress={this.props.onMainButton}
                                style={{backgroundColor:COLORS.button, flex:1, margin:10, borderRadius:10, alignItems:'center', justifyContent:'center'}} 
                            >
                                <Text style={{fontFamily:'JordanBoldGrunge', fontSize:35, color:COLORS.fontGray}} >
                                    {this.props.buttonTitle}
                                </Text>
                            </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.right}>
                    
                    <View style={{backgroundColor:COLORS.c2, flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Icon name='view-week' size={40} color={COLORS.fontGray} />
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={this.props.onOptionsButton1}
                                style={{backgroundColor:COLORS.button, flex:1, borderRadius:10, margin:5, alignItems:'center', justifyContent:'center'}}
                            >

                                {(()=>{ let fontSize // for fontsize resize if 'any'
                                    if(this.props.options[0] == 'any'){
                                        fontSize = 24
                                    } else { fontSize = 30 }
                                    return (
                                        <Text style={{fontFamily:'JordanBoldGrunge', fontSize, color:COLORS.fontGray}} >
                                            { this.props.options[0] }
                                        </Text>
                                    )
                                })()}

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{backgroundColor:COLORS.c3, flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Icon name='people' size={40} color={COLORS.fontGray}/>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={this.props.onOptionsButton2}
                                style={{backgroundColor:COLORS.button, flex:1, borderRadius:10, margin:5, alignItems:'center', justifyContent:'center'}}
                            >
                                

                                {(()=>{ let fontSize // for fontsize resize if 'any'
                                    if(this.props.options[1] == 'any'){
                                        fontSize = 24
                                    } else { fontSize = 30 }
                                    return (
                                        <Text style={{fontFamily:'JordanBoldGrunge', fontSize, color:COLORS.fontGray}} >
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
        backgroundColor: COLORS.menuTitle,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        backgroundColor: COLORS.c1,
        // padding: 10
    },
    left: {
        flex: 2,
        marginLeft: 5,
        marginRight: 0
    },
    right: {
        flex: 1,
        marginLeft: 15,
        marginRight: 5
    }
})

export default MenuTab