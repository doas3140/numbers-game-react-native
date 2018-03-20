import io from 'socket.io-client'

export const socket = io('http://192.168.1.131:8888/')

export const emit_info = (username)=>{ // nebereiks veliau, nes siusim viska per username
    socket.emit('user_info', {username})
    socket.emit('')
}

export const emit_find_game = (username, user_count)=>{
    //rowLength can be: 'any','3','4','5'
    //timer can be:     'any','30','60','90','-' ('-' = no limit)
    socket.emit('find_game', {username, user_count})
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