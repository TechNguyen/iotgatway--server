const express = require('express')
const route = express.Router();
const Applications = require('../app/controller/application')

route.get('/', Applications.getAllApplication)
route.post('/create', Applications.createOneApplication)

module.exports = route