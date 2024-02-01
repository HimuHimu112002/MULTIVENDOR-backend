const express = require('express')
const app = express()
const DatabaseConnection = require('./database/database.js')
require('dotenv').config()
const cors = require('cors')
const routes = require("./routes/index.js")
const path = require('path')


app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use(express.json())

DatabaseConnection()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// static image create korar jonno ja browser hit korle jeno image show kore

app.use(routes)

app.listen(8000)