const express = require("express")
const productReviewController = require("../controllers/productreview_controller")
const router = express.Router()

router.get('/:pk', productReviewController.getProductReviews)
router.post('/review', productReviewController.getProductId)
router.post('/:user_id', productReviewController.createProductReviews)

module.exports = router;