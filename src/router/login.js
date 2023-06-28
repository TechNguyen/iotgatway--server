const express = require('express')
const route = express.Router();
const authen = require('../app/controller/authen')
route.post('/auth/login', authen.login)
module.exports = route