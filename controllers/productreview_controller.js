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

const createProductReviews = async (req, res) => {
  const user_id = req.params.user_id
  const pk = req.parms.pk
  const { review_content } = req.body

  try {
    await productReviewDao.createProductReviews(user_id, pk, review_content)
    return res.status(201).json({ message: 'success createReview' })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
};

module.exports = { getProductReviews, createProductReviews }