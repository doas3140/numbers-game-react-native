import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

class LoginScreen extends React.Component {

    static navigatorStyle = {
        navBarHidden: true
    }

    onButtonPress = ()=>{
        this.props.navigator.push({
            screen: 'Menu',
            title: 'menu',
            passProps: {
                text: 'wtf is this shi1T?'
            }
        })
        // this.props.navigator.showModal({}) / dismissModal()
    }

    render(){
        return (
            <View>
                <Text> Login screen! </Text>
                <Button title='Login' onPress={this.onButtonPress} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

export default LoginScreen