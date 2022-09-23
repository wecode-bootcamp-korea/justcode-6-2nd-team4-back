const productDao = require('../models/product_dao');

const mainProductList = async () => {
  const list = {}
  list.new = await productDao.getProductListInMonth();
  list.popular = await productDao.getProductListByLiked();  
  return list;
}


module.exports = { mainProductList }