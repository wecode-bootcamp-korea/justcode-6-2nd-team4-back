const express = require("express")
const paymentController = require("../controllers/payment_controller")
const router = express.Router()

router.post('/:pk', paymentController.createOrder);

module.exports = router;