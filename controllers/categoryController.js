const Category = require("../model/categoryModel.js")
const SubCategory = require("../model/subCategoryModel.js")


async function CategoryController(req, res){
    const{name, discription} = req.body

    let duplicateCategory = await Category.find({name})
    if(duplicateCategory > 0){
        return res.send({error: " This Category is already in Exists"})
    }

    let category = new Category({
        name,
        discription
    })   
    category.save()
    res.send({success: "Category Created Successfully"})

}

// ======================== STATUS_UPDATED =====================================
async function CategoryStatusController(req, res){
    const{name, status} = req.body
   
   if(status == "rejected" || status == "waiting"){
        await Category.findOneAndUpdate({name}, {$set:{isActive: false, status: status}}, {new: true})
        return res.send({status: "Status Updated"})

   }else if(status == "approved"){
        await Category.findOneAndUpdate({name},{$set:{isActive: true, status: status}}, {new: true})
        return res.send({status: "Status Updated"})

   }
}

// ============================= subategory controller ======================

async function SubCategoryController(req, res){
    const{name, discription, category} = req.body
    // destructure er majher category ti subcategory model er object name
    let duplicateSubCategory = await SubCategory.find({name})
    if(duplicateSubCategory > 0){
        return res.send({error: "This Sub-Category is already in Exists"})
    }

    let subcategorys = new SubCategory({
        name,
        discription,
        category
    })

    subcategorys.save()
    console.log("sub",subcategorys._id)
    console.log("sub-1",subcategorys.category)
    console.log("sub-2",subcategorys._id)

    await Category.findOneAndUpdate({_id: subcategorys.category}, {$push:{subCategory: subcategorys._id}}, {new: true})

    // akhane (Category.findOneAndUpdate) mane holo category er majhe update hobe (subcategorys.category:) diye category khujte hobe ati muloto category main id access kore thake(subcategorys._id) diye subcategory khujte hobe ati muloto subcategory main id access kore and category er majhe subCategory arry te push kore
    
    //1 = step-1 first kaj holo amra jei category te subcategory push korbo sei category main id access kora {_id: subcategorys.category} akhane jodi category main id khuje na pauya jai tahole subcategory push hobena.

    //2 = step-2 abar amader subcategory main id ti access korte hobe and category er subcategory array te push korte hobe

    res.send({success: "Sub-Category Created Successfully"})

}

async function SubCategoryStatusController(req, res){
    const{name, status} = req.body

    if(status == "rejected" || status == "waiting"){
        await SubCategory.findOneAndUpdate({name}, {$set:{isActive: false, status: status}}, {new: true})
        return res.send({status: "Status Updated"})

    }else if(status == "approved"){
        await SubCategory.findOneAndUpdate({name},{$set:{isActive: true, status: status}}, {new: true})
        return res.send({status: "Status Updated"})

   }

}

// ================== all category =========================
async function getAllcategory(req, res) {
    const data = await Category.find({}).populate("subCategory")
    res.send(data)
}


// ================== all subcategory ========================
async function getAllSubcategory(req, res) {
    const data = await SubCategory.find({}).populate("category")
    res.send(data)
}

module.exports = {CategoryController,CategoryStatusController,SubCategoryController,SubCategoryStatusController,getAllcategory,getAllSubcategory}