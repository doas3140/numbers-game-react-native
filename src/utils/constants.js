// import React from 'react'
import { Dimensions } from 'react-native'

export const {width,height} = Dimensions.get('window')

export const CONST = {
    GAME_WINDOW_MARGIN: 30,
    
    CUBE_SIZE: Math.floor(width/7/10)*10, // 7 - max cubes in a row
    ROW_BONUS_MARGIN: ( width - 7*(Math.floor(width/7/10)*10) )/2, // for left and right margins
    CUBE_MARGIN: 4,
    CUBE_TEXT_SIZE: 35,

    HINT_COLOR: '#ccb100',

    FIRST_ROW_APPEAR_DURATION: 1000,
    ROW_SLIDE_DOWN_DURATION: 300
}

export const COLORS = {
    bg: '#efebe9',
    menuTitle: '#00bfa5',
    c1: '#004d40',
    c2: '#8bc34a',
    c3: '#00bcd4',
    fontDark: '#37474f',
    fontGray: '#455a64',
    button: '#ffd740',
    settingsBg: '#f57f17',
    game: {
        bg: '#004d40',
        gameWindow: '#efebe9',
        numbersBg:  '#607d88',
        hintsBg:    '#607d88',
        hints: '#FB8C00',
        button: '#ffd740'
    }
}

export const nr2color_Light = (number)=>{
    switch(number){
        case 1:
            return '#EF5350'
            break;
        case 2:
            return '#BA68C8'
            break;
        case 3:
            return '#9575CD'
            break;
        case 4:
            return '#1E88E5'
            break;
        case 5:
            return '#26A69A'
            break;
        case 6:
            return '#4CAF50'
            break;
        case 7:
            return '#AFB42B'
            break;
        case 8:
            return '#E65100'
            break;
        case 9:
            return '#A1887F'
            break;
        default:
            return 'white'
    }
}

export const nr2color_Dark = (number)=>{
    switch(number){
        case 1:
            return '#EF5350BF'
            break;
        case 2:
            return '#BA68C8BF'
            break;
        case 3:
            return '#9575CDBF'
            break;
        case 4:
            return '#1E88E5BF'
            break;
        case 5:
            return '#26A69ABF'
            break;
        case 6:
            return '#4CAF50BF'
            break;
        case 7:
            return '#AFB42BBF'
            break;
        case 8:
            return '#E65100BF'
            break;
        case 9:
            return '#A1887FBF'
            break;
        default:
            return 'white'
    }
}

// export const nr2color_Light = (number)=>{
//     switch(number){
//         case 1:
//             return '#b62b6e'
//             break;
//         case 2:
//             return '#9628c6'
//             break;
//         case 3:
//             return '#4374b7'
//             break;
//         case 4:
//             return '#abb8af'
//             break;
//         case 5:
//             return '#98c807'
//             break;
//         case 6:
//             return '#b1a24a'
//             break;
//         case 7:
//             return '#00a78e'
//             break;
//         case 8:
//             return '#ef9421'
//             break;
//         case 9:
//             return '#d13814'
//             break;
//         default:
//             return 'white'
//     }
// }

// export const nr2color_Dark = (number)=>{
//     switch(number){
//         case 1:
//             return '#4f2a3c'
//             break;
//         case 2:
//             return '#553263'
//             break;
//         case 3:
//             return '#333f4c'
//             break;
//         case 4:
//             return '#334f3b'
//             break;
//         case 5:
//             return '#45521b'
//             break;
//         case 6:
//             return '#7f7436'
//             break;
//         case 7:
//             return '#00826f'
//             break;
//         case 8:
//             return '#755934'
//             break;
//         case 9:
//             return '#663528'
//             break;
//         default:
//             return 'white'
//     }
// }

/////////////////////////////////////////////////
// export const number2bgcolorDARK = (number)=>{
//     switch(number){
//         case 1:
//             return '#361d29'
//             break;
//         case 2:
//             return '#3c2346'
//             break;
//         case 3:
//             return '#252d37'
//             break;
//         case 4:
//             return '#24382a'
//             break;
//         case 5:
//             return '#3d4818'
//             break;
//         case 6:
//             return '#7e7335'
//             break;
//         case 7:
//             return '#007463'
//             break;
//         case 8:
//             return '#6f5431'
//             break;
//         case 9:
//             return '#512a20'
//             break;
//         default:
//             return 'white'
//     }
// }