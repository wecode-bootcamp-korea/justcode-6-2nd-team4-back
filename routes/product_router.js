const express = require("express")
const productController = require("../controllers/product_controller")
const router = express.Router()


// 디자인 마켓 메인의 신상품, 인기 상품 슬라이드
router.get('',productController.mainPageList)
// router.get('/themeCategory/:id',productController)

// 맞춤 제작소
// router.get('')
// router.get('/category/:id', productController)

module.exports = router;