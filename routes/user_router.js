const express = require("express")
const userController = require("../controllers/user_controller")
const router = express.Router()

router.post('/signup', userController.signUpController)
router.post('/login', userController.logInController)

module.exports = router;