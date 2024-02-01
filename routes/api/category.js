const express = require('express')
const router = express.Router()

const {CategoryController,CategoryStatusController,SubCategoryController,SubCategoryStatusController,getAllcategory,getAllSubcategory} = require("../../controllers/categoryController.js")

router.post("/createcategory",CategoryController)
router.post("/categoryStatus",CategoryStatusController)
router.post("/subCategory",SubCategoryController)
router.post("/SubCategoryStatus",SubCategoryStatusController)

router.get("/GetCategory",getAllcategory)
router.get("/GetSubCategory",getAllSubcategory)

module.exports = router