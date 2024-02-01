const express = require('express')
const {becomMarchent,AllStore} = require('../../controllers/marchentController.js')
const router = express.Router()

router.post("/becomemarchent", becomMarchent)
router.get("/allStore", AllStore)

module.exports = router