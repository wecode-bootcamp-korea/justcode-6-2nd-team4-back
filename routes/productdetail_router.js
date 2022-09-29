const express = require("express")
const productController = require("../controllers/productdetail_controller")
const validation = require("../middlewares/authorization")
const router = express.Router()

//products
router.get('/:pk/:user_pk?', productController.getProductDetails);
router.patch('/:pk', validation.validateToken, productController.updateIsLiked);

module.exports = router;