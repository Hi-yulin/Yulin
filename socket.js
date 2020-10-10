/*** ws-socket.js ***/

'use strict'
// 实例化WebSocketServer对象，监听8090端口
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8090
    }),
    wshandle = new WebSocketServer({
        port:7788
    })



wss.on('connection', (ws) => {
    console.log('connected.')
    // 当服务器接收到客户端传来的消息时
    // 同时向所有客户端派发消息
    ws.on('message', (message) => {
        console.log('received: %s', message)
        console.log('correct')
        wss.clients.forEach((client) => {
            client.send(message)
        })

    })
})

wshandle.on('connection', (ws) => {
    console.log('connected.')
    // 当服务器接收到客户端传来的消息时
    // 同时向所有客户端派发消息
    ws.on('message', (message) => {
        console.log('操作项:', message)
        wshandle.clients.forEach((client) => {
            client.send(message)
        })
    })
})