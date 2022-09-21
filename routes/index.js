const express = require('express');
const userRouter = require('./user_router');
const productRouter = require('./product_router');
const router = express.Router();

router.get('/ping', (_, res) => { res.send('pong') });


router.use('/users', userRouter);

// 디자인 마켓
router.use('', productRouter)
// 맞춤 제작소
router.use('/custom-shop', productRouter);

module.exports = router;