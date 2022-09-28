const paymentServices = require('../services/payment_service');

const createOrder = async (req, res) => {
  const pk = req.params.pk;

  try {
    const a = await paymentServices.createOrder(pk)
    return res.status(201).json({ message: '구매가 완료 되었습니다.' })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
}

module.exports = { createOrder }