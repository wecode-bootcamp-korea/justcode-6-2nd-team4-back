const express = require("express")
const productController = require("../controllers/product_controller")
const router = express.Router()


// 디자인 마켓
router.get('/',productController.mainPageList)
router.get('/themeCategory/:id',productController.categoryPageList)
router.get('/themeCategory/:id/sort',productController.sortProductList)


module.exports = router;