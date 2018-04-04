// import React from 'react'
import { Dimensions, PixelRatio } from 'react-native'

export const {width,height} = Dimensions.get('window')

const SCALE = {
    font:1,
    size:1
}
if( 0 < width && width <= 350 ){
    SCALE.font = 0.8,
    SCALE.size = 0.8
} else
if( 350 < width && width <= 520 ){
    SCALE.font = 1,
    SCALE.size = 1
} else 
if( 520 < width && width <= 9999 ){
    SCALE.font = 2,
    SCALE.size = 2
}

export const CONST = {
    GAME_WINDOW_MARGIN: 30,
    
    CUBE_SIZE: Math.floor(width/7/10)*10, // 7 - max cubes in a row
    ROW_BONUS_MARGIN: ( width - 7*(Math.floor(width/7/10)*10) )/2, // for left and right margins
    CUBE_MARGIN: 4,
    CUBE_TEXT_SIZE: 35,

    FIRST_ROW_APPEAR_DURATION: 1000,
    ROW_SLIDE_DOWN_DURATION: 300,
    READY_MODAL_LIFETIME: 10000
}

export const COLORS = {
    bluegray: {
        _50:'#ECEFF1',
        _100:'#CFD8DC',
        _200:'#B0BEC5',
        _300:'#90A4AE',
        _400:'#78909C',
        _500:'#607D8B',
        _600:'#546E7A',
        _700:'#455A64',
        _800:'#37474F',
        _900:'#263238'
    },
    purple: {
        _100:'#E1BEE7',
        _500:'#9C27B0',
        _700:'#7B1FA2',

        _A100:'#EA80FC',
        _A200:'#E040FB',
        _A400:'#D500F9',
        _A700:'#AA00FF'
    },
    amber: {
        _100:'#FFECB3',
        _500:'#FFC107',
        _700:'#FFA000',

        _A100:'#FFE57F',
        _A200:'#FFD740',
        _A400:'#FFC400',
        _A700:'#FFAB00'
    },
    teal: {
        _100:'#B2DFDB',
        _500:'#009688',
        _700:'#00796B'
    },

}

export const PALETTE = {
    primary_dark: COLORS.bluegray._700,
    primary_main: COLORS.bluegray._500,
    primary_light: COLORS.bluegray._100,
    
    accent_color: COLORS.amber._A200,

    text_on_primary: '#FFFFFF'+'F0', // 240/255 %
    primary_text: '#212121'+'CD', // 205/255 %
}

export const FONTS = {
    family: 'JordanBoldGrunge',
    mainMenu: {
        logo_size:70*SCALE.font,
        logo_text:35*SCALE.font,
        header:30*SCALE.font,
        button:30*SCALE.font,
        icon1:40*SCALE.font,
        icon2:40*SCALE.font,
        nr_if_any:24*SCALE.font,
        nr_else:30*SCALE.font,
        icon_help:40*SCALE.font,
        icon_settings:40*SCALE.font
    },
    row: {
        cube_text: 32*SCALE.font,
        icon_arrow_bottom: 65*SCALE.font
    },
    timer: {
        text_size: 30*SCALE.font
    }, 
    game: {
        multiplayerGame: {
            icon_back:40*SCALE.font,
            icon_turn:30*SCALE.font,
            icon_timer:33*SCALE.font,
            icon_timer_off:30*SCALE.font,
            icon_help:35*SCALE.font,
            turn_text:30*SCALE.font,
            icon_bullseye:43*SCALE.font,
            end_numbers_text:60*SCALE.font
        },
        singleplayerGame: {
            icon_back:40*SCALE.font,
            icon_turn:30*SCALE.font,
            icon_timer:33*SCALE.font,
            icon_timer_off:30*SCALE.font,
            icon_help:35*SCALE.font,
            turn_text:30*SCALE.font,
            icon_bullseye:43*SCALE.font,
            end_numbers_text:60*SCALE.font
        },
        waitingPlayer: {
            text_size: 25*SCALE.font,
            username_size: 27*SCALE.font,
            circle_size: 'large' //large or small
        }
    },
    endGame: {
        icon1:50*SCALE.font,
        icon2:50*SCALE.font,
        header_text:60*SCALE.font,
        turn_text:40*SCALE.font,
        username_text:40*SCALE.font,
    },
    findingGame: {
        text_size:24*SCALE.font,
        circle_size: 'large'
    },
    help: {
        icon_back:40*SCALE.font,
        icon_forward:40*SCALE.font,
        header:30*SCALE.font,
        text_size:32*SCALE.font,
        page1: {
            line_height:43*SCALE.font
        },
        family: 'NanumPenScript'
    },
    readyModal: {
        button_text:40*SCALE.font,
        text_size:24*SCALE.font,
        circle_size: 'large'
    },
    settings: {
        icon_back:40*SCALE.font,
        header:40*SCALE.font,
        changeUsername: {
            header:25*SCALE.font,
            input_text:25*SCALE.font,
            button_text:20*SCALE.font
        }
    }
}

export const SIZES = {
    cube: {
        height: CONST.CUBE_SIZE - 2*CONST.CUBE_MARGIN,
        width: CONST.CUBE_SIZE - 2*CONST.CUBE_MARGIN,
        margin: CONST.CUBE_MARGIN,
        borderRadius: 4*SCALE.size
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
        btn1:{
            top:300*SCALE.size,
            size:FONTS.endGame.icon1+20, //REQUIRES FONTS
            margin:20*SCALE.size,
            offset:300*SCALE.size
        },
        turnText: {
            start:-100,
            finish:230*SCALE.size
        },
        ggText: {
            start:-100,
            finish:100*SCALE.size
        },
        usernameText: {
            start:-100,
            finish:175*SCALE.size
        }
    },
    findingGame: {
        modal: {
            height: 80*SCALE.size,
            width: 260*SCALE.size,
            marginBottom: 100*SCALE.size
        },
        header: {
            height: 30*SCALE.size,
            width: 230*SCALE.size
        }
    },
    help: {
        height: 500*SCALE.size,
        width: 320*SCALE.size
    },
    readyModal: {
        modal: {
            height:140*SCALE.size,
            width:260*SCALE.size,
            marginBottom:100*SCALE.size
        },
        button: {
            height:80*SCALE.size,
            width:200*SCALE.size
        },
        header: {
            height:30*SCALE.size,
            width:230*SCALE.size
        }
    },
    selectNumber: {
        height: CONST.CUBE_SIZE*4 + 10,
        width: CONST.CUBE_SIZE*3 + 10,
        padding: 5,
        borderRadius: 4
    },
    settings: {
        modal: {
            height:400*SCALE.size,
            width:300*SCALE.size
        },
        menuItem: {
            height:100*SCALE.size,
            button_width:90*SCALE.size
        }
    }
}

export const COLORS2 = {
    mainMenu: {
        logo: PALETTE.primary_light,
        logo_text: PALETTE.primary_light,
        icon_help: PALETTE.text_on_primary,
        icon_settings: PALETTE.text_on_primary,
        background: PALETTE.primary_main,
        menuTab: {
            row1_bg: PALETTE.primary_dark,
            row2_bg: PALETTE.primary_dark,
            header_text: PALETTE.text_on_primary,
            button_bg: PALETTE.accent_color,
            button_text: PALETTE.primary_text,
            rightPart: {
                row1_bg: PALETTE.primary_dark,
                row2_bg: PALETTE.primary_dark,
                text: PALETTE.primary_text,
                icon: PALETTE.text_on_primary,
                button_bg: PALETTE.accent_color
            }
        }
    },
    row: {
        leftPart: {
            background: PALETTE.primary_dark,
            cube_text: PALETTE.primary_text
        },
        rightPart: {
            background: PALETTE.primary_dark,
            button_bg: PALETTE.accent_color,
            hint1_bg: PALETTE.accent_color,
            hint2_bg: PALETTE.accent_color
        }
    },
    timer: {
        text: PALETTE.text_on_primary
    },
    game: {
        singleplayerGame: {
            background: PALETTE.primary_main,
            end_bg: PALETTE.primary_main,
            header_bg: PALETTE.primary_dark,
            top_row_bg: PALETTE.primary_dark,
            turn_text: PALETTE.text_on_primary,
            game_window_bg: PALETTE.primary_main,
            end_text: PALETTE.accent_color,

            icon_back:PALETTE.text_on_primary,
            icon_turn:PALETTE.text_on_primary,
            icon_timer:PALETTE.text_on_primary,
            icon_timer_off:PALETTE.text_on_primary,
            icon_help:PALETTE.text_on_primary,
            icon_bullseye:PALETTE.accent_color,
        },
        multiplayerGame: {
            background: PALETTE.primary_main,
            end_bg: PALETTE.primary_main,
            header_bg: PALETTE.primary_dark,
            top_row_bg: PALETTE.primary_dark,
            turn_text: PALETTE.text_on_primary,
            game_window_bg: PALETTE.primary_main,
            end_text: PALETTE.accent_color,

            icon_back:PALETTE.text_on_primary,
            icon_turn:PALETTE.text_on_primary,
            icon_timer:PALETTE.text_on_primary,
            icon_timer_off:PALETTE.text_on_primary,
            icon_help:PALETTE.text_on_primary,
            icon_bullseye:PALETTE.accent_color,
        },
        selectNumber: {
            background: 'rgba(0,0,0,0.5)',
            modal_bg: PALETTE.primary_dark,
            empty_cube: PALETTE.primary_main,
            text: PALETTE.primary_text
        },
        waitingPlayer: {
            background: PALETTE.primary_dark,
            username_text: PALETTE.accent_color,
            text: PALETTE.text_on_primary,
            circle: PALETTE.text_on_primary
        }
    },
    endGame: {
        background: 'rgba(0,0,0,0.7)',
        button1_bg: PALETTE.accent_color,
        button2_bg: PALETTE.accent_color,
        header_text: PALETTE.accent_color,
        text: PALETTE.primary_light,
        username_text: PALETTE.primary_light 
    },
    findingGame: {
        background: 'rgba(0,0,0,0.5)',
        text: PALETTE.text_on_primary,
        circle: PALETTE.text_on_primary,
        modal_bg: PALETTE.primary_main
    },
    help: {
        background: 'rgba(0,0,0,0.5)',
        modal_bg: PALETTE.primary_main,
        icon_back: PALETTE.text_on_primary,
        icon_forward: PALETTE.text_on_primary,
        header_text: PALETTE.text_on_primary,
        header_bg: PALETTE.primary_dark,
        text: PALETTE.text_on_primary,
        page1: {
            subtext1: 'yellow',
            subtext2: 'orange',
            subtext3: 'red'
        }
    },
    readyModal: {
        background: 'rgba(0,0,0,0.5)',
        modal_bg: PALETTE.primary_main,
        button_bg: PALETTE.accent_color,
        text: PALETTE.text_on_primary,
        circle: PALETTE.primary_text
    },
    settings: {
        background: 'rgba(0,0,0,0.5)',
        icon_back: PALETTE.text_on_primary,
        header_bg: PALETTE.primary_dark,
        header_text: PALETTE.text_on_primary,
        modal_bg: PALETTE.primary_main,
        item: {
            header_bg: PALETTE.primary_dark,
            header_text: PALETTE.text_on_primary,
            body_bg: PALETTE.primary_light,
            input_text: PALETTE.primary_text,
            button_bg: PALETTE.accent_color,
            button_text: PALETTE.primary_text
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
            return '#D6CA9E'
    }
}

export const nr2color_Dark = (number)=>{
    switch(number){
        case 1:
            return '#EF5350CC'
            break;
        case 2:
            return '#BA68C8CC'
            break;
        case 3:
            return '#9575CDCC'
            break;
        case 4:
            return '#1E88E5CC'
            break;
        case 5:
            return '#26A69ACC'
            break;
        case 6:
            return '#4CAF50CC'
            break;
        case 7:
            return '#AFB42BCC'
            break;
        case 8:
            return '#E65100CC'
            break;
        case 9:
            return '#A1887FCC'
            break;
        default:
            return '#D6CA9ECC'
    }
}