const express = require("express")
const cartController = require("../controllers/cart_controller")
const validation = require("../middlewares/authorization")
const router = express.Router()

router.get('', validation.validateToken, cartController.readCart);
router.post('', validation.validateToken, cartController.createCart);
router.patch('', validation.validateToken, cartController.updateCart)
router.delete('', validation.validateToken, cartController.deleteCart);

module.exports = router;