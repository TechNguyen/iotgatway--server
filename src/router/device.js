const express = require('express')
const route = express.Router();
const Devices = require('../app/controller/devices')

route.get('/', Devices.getAllDevices)
route.post('/create', Devices.createOneDevices)
route.post('/update', Devices.updateDevices)
route.post('/delete', Devices.deleteOneDevice)

route.post('/deletes', Devices.deleteManyDevices)

module.exports = route