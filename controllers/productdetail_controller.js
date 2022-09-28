const e = require('cors');
const { json } = require('stream/consumers');
const { GridFSBucketWriteStream } = require('typeorm');
const product_service = require('../services/productdetail_service');

const getProductDetails = async (req, res) => {
  const pk = req.params.pk;
  const user_pk = req.params.user_pk;
  try {
    const getProducts = await product_service.getProductDetails(pk, user_pk)
    const getOption = await product_service.getProductOption(pk)
    return res.status(201).json({ getProducts, getOption })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateIsLiked = async (req, res) => {
  const pk = req.params.pk;
  const user_id = req.params.user_id;

  try {
    const result = await product_service.updateIsLiked(pk, user_id);
    res.status(201).json({ result });
  }
  catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json(err.message)
  }
};


module.exports = { getProductDetails, updateIsLiked }