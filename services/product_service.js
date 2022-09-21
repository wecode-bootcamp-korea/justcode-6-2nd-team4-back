const productDao = require('../models/product_dao');

const productList = async () => {
  const newProductList = await productDao.getProductListInMonth()  
  const popularProductList = await productDao.getProductListByLiked()
  return newProductList, popularProductList;
}


module.exports = { productList }