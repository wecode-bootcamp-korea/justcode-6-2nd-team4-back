const paymentDao = require('../models/payment_dao');

const createOrder = async (user_id) => {
  return await paymentDao.createOrder(user_id);
}

const deleteCart = async(user_id) => {
  return await paymentDao.deleteCart(user_id);
}

module.exports = { createOrder, deleteCart }