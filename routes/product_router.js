const express = require("express")
const productController = require("../controllers/product_controller")
const router = express.Router()


router.get('/',productController.mainPageList)
router.get('/themeCategory/:id/sort',productController.productList)


module.exports = router;