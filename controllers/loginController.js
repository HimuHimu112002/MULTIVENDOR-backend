const bcrypt = require('bcrypt');
const emailVelidation = require("../helpers/emailValidation.js")
const User = require("../model/usersModel.js")


let loginController = async (req, res)=>{
    let {email, password} = req.body

    if(!email){
        res.send({error: "Please Enter Your Email"})
    }else if(!emailVelidation(email)){
        res.send({error: "Please Enter Your Valid Email"})
    }else if(!password){
        res.send({error: "Please Enter The Password"})
    }else{

        let EmailExist = await User.find({email})

        if(EmailExist.length > 0){
            bcrypt.compare(password, EmailExist[0].password).then(function(result) {
                if(result){
                    res.send({
                        success: "Login Successfull Thank You",
                        email: email,
                        role: EmailExist[0].role
                    })
                }else{
                    res.json({"error":"password is not matching"})
                }
            });
        }else{
            res.json({"error":"Email is not matching"})
        }
    }
}

module.exports = loginController