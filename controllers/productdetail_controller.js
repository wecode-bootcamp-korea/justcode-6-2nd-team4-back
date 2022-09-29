const product_service = require('../services/productdetail_service');

const getProductDetails = async (req, res) => {
  const product_id = req.params.pk;
  const user_id = req.params.user_pk;
  
  try {
    const getProducts = await product_service.getProductDetails(product_id, user_id)
    const getOption = await product_service.getProductOption(product_id)
    return res.status(201).json({ getProducts, getOption })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateIsLiked = async (req, res) => {
  const product_id = req.params.pk;
  const { id } = req.foundUser;

  try {
    const result = await product_service.Liked(product_id, id);
    res.status(201).json({ result });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};


module.exports = { getProductDetails, updateIsLiked }