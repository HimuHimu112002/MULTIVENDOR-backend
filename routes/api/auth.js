const express = require('express')
const router = express.Router()
const registrationController = require("../../controllers/registrationController.js")
const loginController = require("../../controllers/loginController.js")
const OtpMatchController = require('../../controllers/otpMatchController.js')
const forgotpassword = require('../../controllers/forgotPasswordController.js')
const resetpassword = require('../../controllers/resetPasswordController.js')



router.post("/registration",registrationController)
router.post("/login", loginController)
router.post("/otp", OtpMatchController)
router.post("/forgotpassword", forgotpassword)
router.post("/resetpassword", resetpassword)



module.exports = router