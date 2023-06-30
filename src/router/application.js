const express = require('express')
const route = express.Router();
const Applications = require('../app/controller/application')

route.get('/', Applications.getAllApplication)
route.post('/create', Applications.createOneApplication)
route.post('/update', Applications.updateApplication)
route.post('/delete', Applications.deleteOneApplication)
route.post('/deletes', Applications.deleteManyApplications)
module.exports = route