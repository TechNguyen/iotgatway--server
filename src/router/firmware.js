const express = require('express')
const route = express.Router();
const FirmWares = require('../app/controller/firmware')

route.get('/', FirmWares.getAllFirmware)
route.post('/create', FirmWares.createOneDevices)

module.exports = route