const mongoose = require("mongoose")
const {Schema} = mongoose

const subcategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    discription:{
        type: String,
        
    },
    isActive:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        default: "waiting",
        enum:["waiting", "approved", "rejected"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    updated:{
        type: Date,
    },
    created:{
        type: Date,
        default: Date.now,
       
    },
    
})

module.exports = mongoose.model("SubCategory", subcategorySchema)