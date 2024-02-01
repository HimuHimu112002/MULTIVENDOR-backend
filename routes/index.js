const express = require('express')
const router = express.Router()
const apiRoutes = require("./api/index.js")

const api = process.env.BASE_URL

router.use(api, apiRoutes)
// akhane api and apiRoutes er duti routes matching korte hobe na korle error show korbe

router.use(api,(req, res) => res.json("Api Dose Not Matching"))

module.exports = router