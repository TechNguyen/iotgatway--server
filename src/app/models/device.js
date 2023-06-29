const  {Squelize, DataTypes} = require('sequelize')
const squelize = new Squelize(process.env.DB_SERVER, process.env.DB_USER, process.env.DB_PWD)