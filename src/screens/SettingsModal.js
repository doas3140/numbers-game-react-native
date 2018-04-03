import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS, COLORS2, SIZES } from '../utils/constants'

class SettingsModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        usernameTextInput: this.props.username
    }

    onExitPress = ()=>{
        this.props.navigator.dismissLightBox()
    }

    onButtonPress = ()=>{
        if(this.state.usernameTextInput.length < 10 || this.state.usernameTextInput.length > 5){
            this.props.changeUsername(this.state.usernameTextInput.toLowerCase())
        } else {
            alert('Username must be between 5 and 10 symbols')
        }
        Keyboard.dismiss()
        this.onExitPress()
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.modal}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.onExitPress}>
                            <Icon name='arrow-back' size={FONTS.settings.icon_back} color={COLORS2.settings.icon_back} style={{marginLeft:8, marginRight:18}} />
                        </TouchableOpacity>
                        <Text style={{color:COLORS2.settings.header_text,fontFamily:FONTS.family,fontSize:FONTS.settings.header}}>
                            options
                        </Text>
                    </View>

                    <View style={styles.body}>

                        <View style={{height: SIZES.settings.menuItem.height}}>
                            <View style={{flex:1, backgroundColor: COLORS2.settings.item.header_bg, justifyContent:'center'}}>
                                <Text style={{color:COLORS2.settings.item.header_text,fontFamily:FONTS.family,fontSize:FONTS.settings.changeUsername.header,marginLeft:10}}>
                                    change username
                                </Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', backgroundColor: COLORS2.settings.item.body_bg}}>
                                <TextInput 
                                    style={{flex:1, fontSize:FONTS.settings.changeUsername.input_text, fontFamily:FONTS.family,color:COLORS2.settings.item.input_text}}
                                    value={this.state.usernameTextInput}
                                    onChangeText={(usernameTextInput)=>this.setState({usernameTextInput})}
                                    onSubmitEditing={this.onButtonPress}
                                />
                                <TouchableOpacity onPress={this.onButtonPress}
                                    style={{width:SIZES.settings.menuItem.button_width, margin: 10, backgroundColor:COLORS2.settings.item.button_bg, alignItems:'center',justifyContent:'center'}}
                                >
                                    <Text style={{color:COLORS2.settings.item.button_text,fontFamily:FONTS.family,fontSize:FONTS.settings.changeUsername.button_text}}>
                                        confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: COLORS2.settings.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: SIZES.settings.modal.height,
        width: SIZES.settings.modal.width,
        backgroundColor: COLORS2.settings.modal_bg
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS2.settings.header_bg,
        alignItems: 'center'
    },
    body: {
        flex: 5,
        margin: 20
    }
  })

export default SettingsModal