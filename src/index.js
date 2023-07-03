require('dotenv').config();
const express = require("express");
const app = express();
const http = require('http')
const methodOverride = require('method-override')
const path = require("path");
const port = process.env.PORT;
const morgan = require("morgan");
const route = require("./router");
const db = require("./config/database");
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const server = http.createServer(app);
const cors = require('cors')
// Connect database

db.connect();

console.log(db.connect());
//overide Header 
app.use(methodOverride('_method'))
// HTTP logger
app.use(morgan("combined"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookParser())



app.use(cors())



app.get('/', (req, res) => {
  res.send('Hello world')
})
// Routers
route(app);

server.listen(port, () => {
  console.log(`http:${port}`);
});