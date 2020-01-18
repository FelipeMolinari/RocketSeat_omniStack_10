const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const connections = []
const calculeteDistance = require('./utils/calculeteDistance')
 let io
exports.setubWebSocket = (server)=>{
     io = socketio(server)

     io.on('connection', socket => {
        const {latitude, longitude, techs} = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        })

     })
}

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculeteDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item))
        
    })

}

exports.sendMassege = (to, message, data) => {
    to.forEach(conection => {
        io.to(conection.id).emit(message, data)
    })
}