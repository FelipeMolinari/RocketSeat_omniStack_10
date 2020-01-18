const express = require('express')
const routes = require('./router')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const {setubWebSocket} = require('./websocket')


const app = express()
const server = http.Server(app)

setubWebSocket(server)

mongoose.connect('mongodb+srv://admin:admin@cluster0-lrmmo.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(routes)


server.listen(3333)