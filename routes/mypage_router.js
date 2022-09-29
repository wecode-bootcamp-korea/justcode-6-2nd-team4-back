const express = require("express")
const myPageController = require("../controllers/mypage_controller")
const validation = require("../middlewares/authorization")
const router = express.Router()

router.get('', validation.validateToken, myPageController.getUserMyPage);
router.get('/order', validation.validateToken, myPageController.getUserOrder);
router.get('/liked', validation.validateToken, myPageController.getUserLikeList);

module.exports = router;