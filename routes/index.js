const express = require('express');
const userRouter = require('./user_router');

const productRouter = require('./productdetail_router');

const productmainRouter = require('./product_router');

const router = express.Router();

router.get('/ping', (_, res) => { res.send('pong') });


router.use('/users', userRouter);
router.use('/products', productRouter);

// 디자인 마켓
router.use('', productRouter);

module.exports = router;