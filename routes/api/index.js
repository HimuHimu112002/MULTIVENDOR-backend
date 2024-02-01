const express = require('express')
const router = express.Router()
const authentication = require("./auth.js")
const category = require("./category.js")
const productUpload = require("./product.js")
const marchentRoutes = require("./marchent.js")

router.use("/auth",authentication)
router.use("/category",category)
router.use("/marchent",marchentRoutes)
router.use("/product",productUpload)

module.exports = router