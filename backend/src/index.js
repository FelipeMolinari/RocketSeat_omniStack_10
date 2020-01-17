const express = require('express')
const routes = require('./router')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://admin:admin@cluster0-lrmmo.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(routes)


app.listen(3333)