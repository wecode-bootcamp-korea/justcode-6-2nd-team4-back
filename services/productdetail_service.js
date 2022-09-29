const productDao = require('../models/productdetail_dao');

const getProductDetails = async (product_id, user_id) => {
  let result = await productDao.getProductDetails(product_id, user_id);
  result.forEach((e) => {
    if (!user_id) {
      (e["is_liked"]) = 0
    }
  })
  return result;
}

const getProductOption = async (product_id) => {
  let result = await productDao.getProductDetailOption(product_id);
  result.forEach((e) => {
    e["detail"] = JSON.parse(e["detail"])
  });
  return result;
}
const Liked = async (pk, user_id) => {
  const check = await productDao.checkLiked(pk, user_id)
  if (check.length > 0) {
    return await productDao.updateIsLiked(pk, user_id)
  }
  else {
    return await productDao.insertIsLiked(pk, user_id)
  }
}


module.exports = { getProductDetails, getProductOption, Liked}