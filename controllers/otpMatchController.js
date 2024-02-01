const User = require("../model/usersModel.js")

let OtpMatchController = async (req, res)=>{
    let {email, randomOtp} = req.body
    let OtpMatchFind = await User.find({email})

    if(OtpMatchFind.length > 0){
        if(randomOtp == OtpMatchFind[0].randomOtp){
            // otp remove section start
            await User.findOneAndUpdate(
                {email},
                {$unset: {randomOtp:""}},
                {new: true}
                        
            )

            res.json({success: "Otp matching"})
        }else{
            res.json({error: "Otp not matching"})

        }
    }
}
module.exports = OtpMatchController