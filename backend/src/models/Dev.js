const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    github_avatarUrl: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model("Dev", DevSchema)