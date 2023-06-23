const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = require('mongodb')
const account = new Schema({
    username: String,
    password: String,
}, {
    collection: 'account',
    timestamps: true
})
const accModels = mongoose.model('account',account)


module.exports = accModels