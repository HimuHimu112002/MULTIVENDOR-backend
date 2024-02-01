const Store = require("../model/marchentModel.js") 
const User = require("../model/usersModel.js")
async function becomMarchent(req, res){
   const {storename,officialEmail,officialPhone,address,owner,products} = req.body

    const store = new Store({
       storename,
       officialEmail,
       officialPhone,
       address,
       owner,
       products

    })
   store.save()
   res.send({success: "Store create successfull"})
   await User.findOneAndUpdate({_id:owner}, {role: "marchent"}, {new: true})

}


async function AllStore(req, res){
   let data = await Store.find({owner: "649bb30f2190f4715522b098"})
   res.send(data)
}


module.exports = {becomMarchent,AllStore};