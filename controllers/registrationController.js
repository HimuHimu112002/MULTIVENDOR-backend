const bcrypt = require('bcrypt');
const User = require("../model/usersModel.js")
const emailVelidation = require("../helpers/emailValidation.js")
const emailSend = require("../helpers/emailSend.js")
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dffw2zrr5', 
    api_key: '879715882165616', 
    api_secret: '-7j54s0n-hRoo1yZlkIh16nO3AM'

});


let registrationController =  async (req, res)=>{

    const {fullname, email, phone, password,profileImg} = req.body
    
    let url = ""
    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg").then(result =>{
        url = result.url
    }).catch((error)=>{
        
    })
    //return

    if(!fullname){
        res.send({error: "Please Enter Your Fullname"})
    }else if(!email){
        res.send({error: "Please Enter Your Email"})
        
    }else if(!emailVelidation(email)){
        res.send({error: "Please enter the valid email"})
    }else if(!phone){
        res.send({error: "Please Enter Your Phone Number"})
    }else if(!password){
        res.send({error: "Please Enter The Password"})
    }
    else {

        let duplicateEmail = await User.find({email: email})
        if(duplicateEmail.length > 0){
            return res.send({error: "This email already in used. Try another email"})
        }

        bcrypt.hash(password, 10, async function(err, hash) {

            const generator2 = aleaRNGFactory(Date.now());
            let randomOtpNumber = generator2.uInt32().toString().substring(0, 4)

            let user = new User({
                fullname: fullname,
                phone: phone,
                email: email,
                password: hash,
                randomOtp:randomOtpNumber,
                profileImg: url
                
            })

            user.save()
            emailSend(email, randomOtpNumber)
            res.send({success: "Registration Successfull Thank You"})
            
            // let randonOtpStore = await User.findOneAndUpdate(
            //     {email},
            //     {$set: {randomOtp:randomOtpNumber}},
            //     {new: true}
                
            // )
            // avabeo email er vhitore otp set kora jai and database pathano jai
            
        });
       
    }
}

module.exports = registrationController;