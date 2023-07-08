const express = require('express')
const route = express.Router();
const check = require('../app/controller/checkversion')


route.post('/update', check.checkversion)

module.exports = route