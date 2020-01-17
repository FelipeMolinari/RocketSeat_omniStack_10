const { Router } = require('express')
const devController = require('./controllers/devController')
const searchController = require('./controllers//searchController')

const routes = Router()

// Métodos HTTP get, post, put, delete

// Tipos de parâmetros
//Query Parmas: request.query (Encontrar usuário, filtro, ordenação, paginação...)
//Router Parmas: request.params (Identificar recurso pra remoção ou atualização)
//Body: request.body


routes.get('/search', searchController.index)
routes.get('/devs', devController.index)
routes.post('/devs', devController.store)
routes.put('/devs/:github_username', devController.update)
routes.delete('/devs/:github_username', devController.delete)
module.exports = routes 