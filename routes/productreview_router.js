const express = require("express")
const productReviewController = require("../controllers/productreview_controller")
const validation = require("../middlewares/authorization")
const router = express.Router()

router.get('/:pk', productReviewController.getProductReviews)
router.post('/:pk', validation.validateToken,  productReviewController.createProductReviews)

module.exports = router;