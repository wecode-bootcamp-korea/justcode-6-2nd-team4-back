const express = require("express")
const userController = require("../controllers/user_controller")
const router = express.Router()

router.post('/signup', userController.signUpController)

module.exports = router;