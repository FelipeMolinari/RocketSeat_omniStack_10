const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const {findConnections, sendMassege} = require('../websocket')
// index, show, store, update, delete

module.exports = {

    async index(request, response){
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response) {
    
        
        const {github_username, techs, longitude, latitude} = request.body

        let dev = await Dev.findOne({github_username})

        if(!dev){
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`)
        
            const {name = login, avatar_url, bio} = apiResponse.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            dev = await Dev.create({
                github_username,
                name,
                bio,
                github_avatarUrl : avatar_url,
                techs : techsArray,
                location
            })
        const sendScketMessageTo = findConnections({
            latitude, longitude},
            techsArray,
            )
        sendMassege(sendScketMessageTo, 'new-dev', dev)

        }

        return response.json(dev)
    },

    async update(request, response){
        const {github_username} = request.params

        let indexDev = await Dev.findOne({github_username})

        if(!indexDev) return response.status(204).json()

        const {techs, github_avatarUrl, latitude, longitude} = request.body

        const techsAsArray = parseStringAsArray(techs)

        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }

        indexDev.techs = techsAsArray
        indexDev.github_avatarUrl = github_avatarUrl
        indexDev.location = location
        
        return response.json(indexDev)
        
    },

    async delete(request, response){
        const {github_username} = request.params
        
        const listDevs = await Dev.deleteOne({github_username})
        return response.json(listDevs)
       
    }
}