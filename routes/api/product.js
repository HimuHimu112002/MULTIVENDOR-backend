const express = require('express')
const router = express.Router()
const {sequreProductUpload,createProduct, createVariant,GetAllProduct,DeletProduct,GetAllVariant} = require("../../controllers/productController.js")

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //console.log(file.originalname.split('.')[1])
      cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split('.')[1]}`)
    }
  })
  
const upload = multer({ storage: storage })
// ===================== multer usign image upload ==================

//,sequreProductUpload,
router.post("/CreateProduct",createProduct)
router.get("/GetAllProduct",GetAllProduct)
router.post("/DeletProduct",DeletProduct)


router.post("/CreateProductVarient",upload.single('image'),createVariant)
router.get("/GetAllVarient",GetAllVariant)

module.exports = router