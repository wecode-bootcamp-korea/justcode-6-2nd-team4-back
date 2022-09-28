const { CallTracker } = require('assert');
const { json } = require('stream/consumers');
const { InsertValuesMissingError } = require('typeorm');
const productDao = require('../models/productdetail_dao');

const getProductDetails = async (pk, user_pk) => {
  let result = await productDao.getProductDetails(pk, user_pk);

  result.forEach((e) => {
    if (!user_pk) {
      (e["is_liked"]) = 0
    }
  })

  return result;
}

const getProductOption = async (pk) => {
  let result = await productDao.getProductDetailOpton(pk);
  result.forEach((e) => {
    e["detail"] = JSON.parse(e["detail"])
  });
  return result;
}

const updateIsLiked = async (pk, user_id) => {
  return await productDao.updateIsLiked(pk, user_id)
}

module.exports = { getProductDetails, getProductOption, updateIsLiked }