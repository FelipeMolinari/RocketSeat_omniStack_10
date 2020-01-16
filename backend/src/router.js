const { Router } = require('express')
const devController = require('./controllers/devController')
const routes = Router()

// Métodos HTTP get, post, put, delete

// Tipos de parâmetros
//Query Parmas: request.query (Encontrar usuário, filtro, ordenação, paginação...)
//Router Parmas: request.params (Identificar recurso pra remoção ou atualização)
//Body: request.body


routes.post('/devs', devController.store)

module.exports = routes 