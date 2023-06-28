const express = require('express')
const route = express.Router();
const Devices = require('../app/controller/devices')

route.get('/', Devices.getAllDevices)
route.post('/create', Devices.createOneDevices)

module.exports = route