const productReviewDao = require('../services/productreview_service');

const getProductReviews = async (req, res) => {
  const product_id = req.params.pk;

  try {
    const getReviews = await productReviewDao.getProductReviews(product_id)
    return res.status(201).json({ getReviews })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createProductReviews = async (req, res) => {
  const { id } = req.foundUser;
  const { rate, review_content } = req.body
  const product_id = req.params.pk

  console.log("key : ", id, product_id, rate, review_content)
  try {
    await productReviewDao.createProductReviews(id, product_id, rate, review_content)
    return res.status(201).json({ message: 'success createReview' })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
};

module.exports = { getProductReviews, createProductReviews }