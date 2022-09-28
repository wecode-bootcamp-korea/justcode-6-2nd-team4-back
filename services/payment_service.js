const paymentDao = require('../models/payment_dao');

const createOrder = async (pk) => {
  return await paymentDao.createOrder(pk);
}

module.exports = { createOrder }