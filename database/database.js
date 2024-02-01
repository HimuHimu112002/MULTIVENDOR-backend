const mongoose = require('mongoose')

function DatabaseConnection() {
    mongoose.connect(process.env.MONGODBURL).then(() =>{
        console.log("Database Connection Complete")
    });
}

module.exports = DatabaseConnection;