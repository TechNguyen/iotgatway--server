const express = require('express')
const route = express.Router()
const downfile = require('../app/controller/downfile')

route.get('/file', downfile.file)
module.exports = route