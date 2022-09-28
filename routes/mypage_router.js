const express = require("express")
const myPageController = require("../controllers/mypage_controller")
const router = express.Router()

// /mypage
router.get('/:pk', myPageController.getUserMyPage);
router.get('/order/:pk', myPageController.getUserOrder);
router.get('/liked/:pk', myPageController.getUserLikeList);

module.exports = router;