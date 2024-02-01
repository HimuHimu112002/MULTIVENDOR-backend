const bcrypt = require('bcrypt');
const User = require("../model/usersModel.js")

let resetPasswordController =  async (req, res)=>{

    const {email, newpassword} = req.body

    bcrypt.hash(newpassword, 10, async function(err, hash) {
        await User.findOneAndUpdate({email}, {password: hash})
        res.send({success: "Password change Successfull"})
            
    })         
    
}
module.exports = resetPasswordController;