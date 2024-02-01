const nodemailer = require("nodemailer");

async function forgotPassword(email, resetPasswordLink) {
   
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mdhmaktaruzzaman9101@gmail.com",
        pass: "mopgvxmusxutzubs",
      },

    });
 
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻"',
      to: email,
      subject: "Reset Password",
      text: `Hello world?`,
      html:`<h1 style="font-family: Arial, Helvetica, sans-serif;color: #262626;">OREBI</h1> <h2 style="font-family: Arial, Helvetica, sans-serif;font-size: 34px; color: #262626;">Please Reset Password</h2> <p style="font-family: Arial, Helvetica, sans-serif;">Welcome to our orebi ecommerce family.</p><br/><h5>If you reset password : <a href="${resetPasswordLink}">click here</a></h5>`,

    });
  
}

module.exports = forgotPassword