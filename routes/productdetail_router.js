const express = require("express")
const productController = require("../controllers/productdetail_controller")
const router = express.Router()

//products
router.get('/:pk/:user_pk?', productController.getProductDetails);
router.patch('/:pk/:user_id', productController.updateIsLiked);

module.exports = router;