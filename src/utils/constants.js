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
    ROW_SLIDE_DOWN_DURATION: 300,
    READY_MODAL_LIFETIME: 10000
}

export const SIZES = {
    cube: {
        height: CONST.CUBE_SIZE - 2*CONST.CUBE_MARGIN,
        width: CONST.CUBE_SIZE - 2*CONST.CUBE_MARGIN,
        margin: CONST.CUBE_MARGIN,
        borderRadius: 4
    },
    row: {
        button: {
            height: CONST.CUBE_SIZE - CONST.CUBE_MARGIN*2,
            width: CONST.CUBE_SIZE*2 - CONST.CUBE_MARGIN*2,
            margin: CONST.CUBE_MARGIN
        },
        hint: {
            width: CONST.CUBE_SIZE - CONST.CUBE_MARGIN*1.5,
            margin: CONST.CUBE_MARGIN/2 // hint1 - right, hint2 - left margin
        }
    },
    waitingPlayer: {
        marginTop: CONST.CUBE_SIZE + CONST.GAME_WINDOW_MARGIN,
        height: CONST.CUBE_SIZE,
        width: width
    },
    endGame: {
        // because of animations see EndGameModal.js
    },
    findingGame: {
        modal: {
            height: 80,
            width: 260,
            marginBottom: 100
        },
        header: {
            height: 30,
            width: 230
        }
    },
    help: {
        height: 500,
        width: 320
    },
    readyModal: {
        modal: {
            height:140,
            width:260,
            marginBottom:100
        },
        button: {
            height:80,
            width:200
        },
        header: {
            height:30,
            width:230
        }
    },
    selectNumber: {
        height: CONST.CUBE_SIZE*4 + 10,
        width: CONST.CUBE_SIZE*3 + 10,
        padding: 5,
        borderRadius: 4
    }
}

export const FONTS = {
    family: 'JordanBoldGrunge',
    mainMenu: {
        logo_size:70,
        logo_text:35,
        header:30,
        button:35,
        icon1:40,
        icon2:40,
        nr_if_any:24,
        nr_else:30,
        icon_help:40,
        icon_settings:40
    },
    row: {
        cube_text: 35,
        icon_arrow_bottom: 65
    },
    timer: {
        text_size: 30
    },
    game: {
        multiplayerGame: {
            icon_back:40,
            icon_turn:30,
            icon_timer:33,
            icon_timer_off:30,
            icon_help:35,
            turn_text:30,
            icon_bullseye:43,
            end_numbers_text:60
        },
        singleplayerGame: {
            icon_back:40,
            icon_turn:30,
            icon_timer:33,
            icon_timer_off:30,
            icon_help:35,
            turn_text:30,
            icon_bullseye:43,
            end_numbers_text:60
        },
        waitingPlayer: {
            text_size: 25,
            username_size: 27,
            circle_size: 'large' //large or small
        }
    },
    endGame: {
        icon1:50,
        icon2:50,
        header_text:60,
        turn_text:40,
        username_text:40
    },
    findingGame: {
        text_size:24,
        circle_size: 'large'
    },
    help: {
        icon_back:40,
        icon_forward:40,
        header:30,
        text_size:32,
        page1: {
            line_height:43
        },
        family: 'NanumPenScript'
    },
    readyModal: {
        button_text:40,
        text_size:24,
        circle_size: 'large'
    },
    settings: {
        icon_back:40,
        header:40,
        changeUsername: {
            header:25,
            input_text:25,
            button_text:20
        }
    }
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
    helpBg: '#41545C',
    header: 'purple',
    game: {
        bg: '#004d40',
        gameWindow: '#efebe9',
        numbersBg:  '#607d88',
        hints: '#FB8C00',
        button: '#ffd740'
    }
}

export const COLORS2 = {
    mainMenu: {
        logo: COLORS.fontGray,
        logo_text: COLORS.fontGray,
        icon_help: COLORS.fontGray,
        icon_settings: COLORS.fontGray,
        background: COLORS.bg,
        menuTab: {
            row1_bg: COLORS.menuTitle,
            row2_bg: COLORS.c1,
            header_text: COLORS.fontDark,
            button_bg: COLORS.button,
            button_text: COLORS.fontGray,
            rightPart: {
                row1_bg: COLORS.c2,
                row2_bg: COLORS.c3,
                text: COLORS.fontGray,
                icon: COLORS.fontGray,
                button_bg: COLORS.button
            }
        }
    },
    row: {
        leftPart: {
            background: COLORS.game.numbersBg,
            cube_text: COLORS.fontDark
        },
        rightPart: {
            background: COLORS.game.numbersBg,
            button_bg: COLORS.game.button,
            hint1_bg: COLORS.game.hints,
            hint2_bg: COLORS.game.hints
        }
    },
    timer: {
        text: 'white'
    },
    game: {
        singleplayerGame: {
            background:COLORS.game.bg,
            header_bg: COLORS.header,
            turn_text: 'white',
            game_window_bg: COLORS.game.gameWindow,
            end_text: COLORS.game.gameWindow,
            end_bg: COLORS.game.bg,

            icon_back:COLORS.game.gameWindow,
            icon_turn:COLORS.game.gameWindow,
            icon_timer:COLORS.game.gameWindow,
            icon_timer_off:COLORS.game.gameWindow,
            icon_help:COLORS.game.gameWindow,
            icon_bullseye:COLORS.button,
        },
        multiplayerGame: {
            background:COLORS.game.bg,
            header_bg: COLORS.header,
            turn_text: 'white',
            game_window_bg: COLORS.game.gameWindow,
            end_text: COLORS.game.gameWindow,
            end_bg: COLORS.game.bg,

            icon_back:COLORS.game.gameWindow,
            icon_turn:COLORS.game.gameWindow,
            icon_timer:COLORS.game.gameWindow,
            icon_timer_off:COLORS.game.gameWindow,
            icon_help:COLORS.game.gameWindow,
            icon_bullseye:COLORS.button,
        },
        selectNumber: {
            // background: 'rgba(0,0,0,0.5)',
            modal_bg: COLORS.helpBg,
            empty_cube: COLORS.helpBg,
            text: COLORS.fontDark
        },
        waitingPlayer: {
            background: COLORS.header,
            username_text: COLORS.button,
            text: COLORS.game.gameWindow,
            circle: '#ededed'
        }
    },
    endGame: {
        background: 'rgba(0,0,0,0.7)',
        button1_bg: COLORS.button,
        button2_bg: COLORS.button,
        header_text: COLORS.button,
        text: COLORS.button,
        username_text: COLORS.c3 
    },
    findingGame: {
        background: 'rgba(0,0,0,0.5)',
        text: 'white',
        circle: 'white',
        modal_bg: COLORS.c1
    },
    help: {
        background: 'rgba(0,0,0,0.5)',
        modal_bg: COLORS.helpBg,
        icon_back: COLORS.bg,
        icon_forward: COLORS.bg,
        header_text: 'white',
        header_bg: COLORS.header,
        text: 'white',
        page1: {
            subtext1: 'yellow',
            subtext2: 'orange',
            subtext3: 'red'
        }
    },
    readyModal: {
        background: 'rgba(0,0,0,0.5)',
        modal_bg: COLORS.c1,
        button_bg: COLORS.button,
        text: 'white',
        circle: COLORS.c1
    },
    settings: {
        // background: 'rgba(0,0,0,0.5)',
        icon_back: COLORS.bg,
        header_bg: COLORS.header,
        header_text: 'white',
        modal_bg: COLORS.settingsBg,
        item: {
            header_bg: COLORS.c1,
            header_text: COLORS.bg,
            body_bg: COLORS.button,
            input_text: COLORS.fontDark,
            button_bg: '#43a047',
            button_text: COLORS.bg
        }
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