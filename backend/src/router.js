const { Router } = require('express')
const axios = require('axios')
const Dev = require('./models/Dev')

const routes = Router()

// Métodos HTTP get, post, put, delete

// Tipos de parâmetros
//Query Parmas: request.query (Encontrar usuário, filtro, ordenação, paginação...)
//Router Parmas: request.params (Identificar recurso pra remoção ou atualização)
//Body: request.body


routes.post('/devs', async (request, response) => {
    
    const {github_username, techs} = request.body
    const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`)
    
    const {name = login, avatar_url, bio} = apiResponse.data

    const techsArray = techs.split(',').map(tech => tech.trim())

    const dev = await Dev.create({
        github_username,
        name,
        bio,
        github_avatarUrl : avatar_url,
        techs : techsArray,
    })


    return response.json(dev)
})

module.exports = routes 