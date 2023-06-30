const express = require('express')
const route = express.Router();
const FirmWares = require('../app/controller/firmware')

route.get('/', FirmWares.getAllFirmware)
route.post('/create', FirmWares.createOneFirmware)
route.post('/update', FirmWares.updateFirmware)
route.post('/delete', FirmWares.deleteOneFirmware)
route.post('/deletes', FirmWares.deleteManyFirmware)


module.exports = route