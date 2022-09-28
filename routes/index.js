const express = require('express');
const userRouter = require('./user_router');

const productRouter = require('./productdetail_router');
const myPageRouter = require('./mypage_router');

const productreviewRouter = require('./productreview_router');
const paymentRouter = require('./payment_router')

const productreviewRouter = require('./productreview_router')
const productmainRouter = require('./product_router');



const router = express.Router();

router.get('/ping', (_, res) => { res.send('pong') });


router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/mypage', myPageRouter)
router.use('/productreviews', productreviewRouter);
router.use('/payment', paymentRouter)

// 디자인 마켓
router.use('', productRouter);

module.exports = router;