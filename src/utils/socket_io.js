import io from 'socket.io-client'

export const socket = io('http://193.219.91.103:4887/', {
    // 'connect_timeout': 5000,
    'timeout': 6000
})

export const emit_info = (username)=>{ // nebereiks veliau, nes siusim viska per username
    socket.emit('user_info', {username})
    socket.emit('')
}

export const emit_find_game = (username, user_count)=>{
    //user_count can be: 'any','3','4','2'
    socket.emit('find_game', {username, user_count})
    socket.emit('')
}

export const emit_cancel_find = (username)=>{
    socket.emit('cancel_find_game', {username})
    socket.emit('')
}

export const emit_ready_to_play = (username)=>{
    socket.emit('ready_for_game', {username})
    socket.emit('')
}

export const emit_numbers = (username, numbers)=>{
    socket.emit('send_numbers', {username, numbers})
    socket.emit('')
}

export const on = (socket_name, callback)=>{
    socket.on(socket_name, callback)
}

export const off = (socket_name)=>{
    socket.off(socket_name)
    console.log('not listening to: ', socket_name)
}