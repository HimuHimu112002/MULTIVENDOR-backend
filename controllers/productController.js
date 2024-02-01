const express = require('express')
const User = require("../model/usersModel.js")
const Product = require("../model/productModel.js")
const Variant = require("../model/varientModel.js")


async function sequreProductUpload(req, res, next){ 

    let userid = req.headers.authorization.split('@')[1]
    let Password = req.headers.authorization.split('@')[2]

    if(!req.headers.authorization){
        return res.send({error: "Unauthorized"})
    }

    let user = await User.find({_id:userid})

    if(user.length > 0){

        if(Password == process.env.SEQURE_SECRET_KEY){

            if(user[0].role == "marchent"){
                next()
                // next call kora and true houya mane next je function er vhitore ase ay function er kaj ses porborti function chole jao mane next je function er vhitore ase er bahire first je functon thakbe sei functon call hobe
            }else{
                return res.send({error: "Before you marchent then try again"}) 
            }

        }else{
            return res.send({error: "Not able to create a product"})
        }
        
    }
    else{
        return res.send({error: "You are not able to create a product"})
    }
         
}


async function createProduct(req, res){
    let {productname,discription,image,store} = req.body

    let product = new Product({
        productname,
        discription,
        image,
        store
    })
    product.save()
    return res.send({Success: "Product create successfull"})

}

async function GetAllProduct(req, res){
    let data = await Product.find({}).populate("store")
    res.send(data)
}


async function createVariant(req, res){
    let {variantType,color,image,ram,storage,size,product,price,quantity} = req.body

    let variant = new Variant({
        variantType,
        color,
        image: `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`,
        ram,
        storage,
        size,
        product,
        price,
        quantity
        
    })
    variant.save()
    await Product.findOneAndUpdate({_id: variant.product}, {$push:{variants: variant._id}}, {new: true})
    res.send({Success:"Variant create successfull"})
}


async function GetAllVariant(req, res){
    let data = await Variant.find({}).populate("product")
    res.send(data)
}



async function DeletProduct(req, res){
    let deletData = req.body.id
    let data = await Product.findByIdAndDelete(deletData)
    
}


module.exports = {sequreProductUpload,createProduct,createVariant,GetAllProduct,DeletProduct,GetAllVariant}