const productReviewDao = require('../models/productreview_dao');

const getProductReviews = async (pk) => {
  const result = await productReviewDao.getProductReviews(pk);
  return result;
}

const createProductReviews = async (user_id, product_id, rate, review_content) => {

  const check = await productReviewDao.checkOrder(user_id, product_id)
  if (check.length > 0) {
    await productReviewDao.createProductReviews(user_id, product_id, rate, review_content)
  }
  else {
    const error = new Error("구매 이력이 없습니다")
    error.statusCode = 400
    throw error
  }
}


module.exports = { getProductReviews, createProductReviews }