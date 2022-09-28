const express = require('express');
const userRouter = require('./user_router');
const productmainRouter = require('./product_router');
const productRouter = require('./productdetail_router');
const productreviewRouter = require('./productreview_router');
const myPageRouter = require('./mypage_router');
const cartRouter = require('./cart_router');
const paymentRouter = require('./payment_router')

const router = express.Router();

router.get('/ping', (_, res) => { res.send('pong') });


router.use('/users', userRouter);
router.use('', productmainRouter);
router.use('/products', productRouter);
router.use('/productreviews', productreviewRouter);
router.use('/mypage', myPageRouter)
router.use('/cart', cartRouter);
router.use('/payment', paymentRouter)

module.exports = router;