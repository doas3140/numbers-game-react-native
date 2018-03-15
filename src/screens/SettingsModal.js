import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../utils/constants'

class SettingsModal extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        usernameTextInput: this.props.username
    }

    componentDidMount(){
        console.log(this.props.username)
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
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.modal}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.onExitPress}>
                            <Icon name='arrow-back' size={40} color={COLORS.bg} style={{marginLeft:8, marginRight:18}} />
                        </TouchableOpacity>
                        <Text style={{color:'white',fontFamily:'JordanBoldGrunge',fontSize:40}}>
                            options
                        </Text>
                    </View>

                    <View style={styles.body}>

                        <View style={{height: 100}}>
                            <View style={{flex:1, backgroundColor: COLORS.c1, justifyContent:'center'}}>
                                <Text style={{color:COLORS.bg,fontFamily:'JordanBoldGrunge',fontSize:25,marginLeft:10}}>
                                    change username
                                </Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row', backgroundColor: COLORS.button}}>
                                <TextInput 
                                    style={{flex:1, fontSize:25, fontFamily:'JordanBoldGrunge',color:COLORS.fontDark}}
                                    value={this.state.usernameTextInput}
                                    onChangeText={(usernameTextInput)=>this.setState({usernameTextInput})}
                                    onSubmitEditing={this.onButtonPress}
                                />
                                <TouchableOpacity onPress={this.onButtonPress}
                                    style={{width:90, margin: 10, backgroundColor:'#43a047', alignItems:'center',justifyContent:'center'}}
                                >
                                    <Text style={{color:COLORS.bg,fontFamily:'JordanBoldGrunge',fontSize:20}}>
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
    //   backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
        height: 400,
        width: 300,
        backgroundColor: COLORS.settingsBg
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'purple',
        alignItems: 'center'
    },
    body: {
        flex: 5,
        margin: 20
    }
  })

export default SettingsModal