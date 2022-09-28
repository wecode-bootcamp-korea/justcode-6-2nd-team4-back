const { isPrimitive } = require('util');
const productReviewDao = require('../services/productreview_service');

const getProductReviews = async (req, res) => {
  const pk = req.params.pk;
  try {
    const getReviews = await productReviewDao.getProductReviews(pk)
    return res.status(201).json({ getReviews })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getProductId = async (req, res) => {
  const amam = req.body;
  console.log(amam.product_id)
  return;
}

console.log("s", getProductId.amam)

const createProductReviews = async (req, res) => {
  const user_id = req.params.user_id
  const { review_content } = req.body
  console.log("s", getProductId)
  //console.log(amam.product_id)
  try {
    await productReviewDao.createProductReviews(user_id, review_content)
    return res.status(201).json({ message: 'success createReview' })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
};

module.exports = { getProductReviews, getProductId, createProductReviews }