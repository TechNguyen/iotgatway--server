const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId, Int32} = require('mongodb')
const iot = new Schema({
    ID: {
        type: Int32,
        require: true
    },
    Mac: {
        type: String,
        maxLength: 50,
        require: true
    },
    Name: {
        type: String,
        maxLength: 50,
        require: true
    },
    Description: {
        type: String,
        maxLength: 255,
        require: true
    },
    ApplicationID: {
        type: Int32,
        require: true
    },
}, {
    collection: 'iot',
    timestamps: true
})
const accModels = mongoose.model('iot',iot)
module.exports = accModels
