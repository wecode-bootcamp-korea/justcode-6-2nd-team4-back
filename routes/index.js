const express = require('express');
const userRouter = require('./user_router');
const productRouter = require('./productdetail_router');
const router = express.Router();

router.get('/ping', (_, res) => { res.send('pong') });


router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;