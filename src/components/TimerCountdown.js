import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

class TimerCountdown extends React.Component {
    /* PROPS
    initialSeconds
    callback (function) = activates when timer is 0

    /* STATES
    secondsRemaining
    
    /* VARIABLES
    timeoutId

    */

    state = {
        secondsRemaining: this.props.initialSeconds
    }
    timeoutId = null
    uniqueId = this.props.uniqueId

    componentDidMount(){
        this.tick()
    }
    componentWillUnmount(){
        clearTimeout(this.state.timeoutId)
    }

    tick = ()=>{
        if(this.state.secondsRemaining != 0){
            this.timeoutId = setTimeout(()=>{
                this.setState({ secondsRemaining: this.state.secondsRemaining-1 })
                this.tick()
            }, 1000)
        } else { setTimeout(()=>{this.onEnd()},500) }
    }

    onEnd = ()=>{
        this.state.secondsRemaining = this.props.initialSeconds
        this.props.callback(this.tick)
    }

    render(){
        return (
            <Text
                allowFontScaling={this.props.allowFontScaling}
                style={styles.headerNumber}
            >
                {this.state.secondsRemaining}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    headerNumber:{
        fontSize: 30,
        fontFamily: 'JordanBoldGrunge',
        color: 'white'
    }
})

export default TimerCountdown