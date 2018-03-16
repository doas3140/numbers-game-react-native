import { AppRegistry, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';


export const createAnimation = (value, duration, easing, delay=0)=>{
    return Animated.timing(
        value,
        {
            toValue: 1,
            duration,
            easing,
            delay,
            useNativeDriver: true,
        }
    )
}