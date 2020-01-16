const express = require('express')
const routes = require('./router')

const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://admin:admin@cluster0-lrmmo.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

app.use(express.json())
app.use(routes)


app.listen(3333)