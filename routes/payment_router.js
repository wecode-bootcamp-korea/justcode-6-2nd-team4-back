const express = require("express")
const paymentController = require("../controllers/payment_controller")
const validation = require("../middlewares/authorization")
const router = express.Router()

router.post('', validation.validateToken, paymentController.createOrder);

module.exports = router;