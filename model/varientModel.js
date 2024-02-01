const mongoose = require("mongoose")
const {Schema} = mongoose

const VariantSchema = new Schema({
    variantType:{
        type: String,
        require: true
    },
    color:{
        type:String,
    },
    image:{
        type:String,
        require:true
    },
    ram:{
        type:String,
    },
    storage:{
        type:String,
        require:true
    },
    size:{
        type:String,
    },
    price:{
        type:String,
    },
    quantity:{
        type:String,
    },
    // store:{
    //     type: Schema.Types.ObjectId,
    //     ref: "Store"
    // },
    product:{
        type: Schema.Types.ObjectId,
        ref:"Product",
        require: true
    },
    updated:{
        type: Date,
    },
    created:{
        type: Date,
        default: Date.now,
    },

})


module.exports = mongoose.model("Variant", VariantSchema)