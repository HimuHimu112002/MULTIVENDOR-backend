const User = require("../model/usersModel.js")
// const emailVelidation = require("../helpers/emailValidation.js")
const forgotPassword = require("../helpers/forgotPassword.js")
// const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let forgotPasswordController =  async (req, res)=>{

    const {email} = req.body
    let duplicateEmail = await User.find({email: email})
    if(duplicateEmail.length == 0){
        return res.send({error: "Email not found"})
    }

    forgotPassword(email, `http://localhost:5173/resetpassword?email=${email}`)
    res.send({success: "Email match please check your email"})
                 
    
}

module.exports = forgotPasswordController;