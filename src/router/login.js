const express = require('express')
const route = express.Router();
const login = require('../app/controller/login')
route.post('/login', login.signin)
module.exports = route