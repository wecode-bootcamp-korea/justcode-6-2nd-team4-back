const productDao = require('../models/product_dao');

const mainProductList = async () => {
  const list = {}
  list.new = await productDao.getProductListInMonth();
  list.popular = await productDao.getProductListByLiked();  
  return list;
}

const productListByCategory = async (category_id, offset) => {
  offset = Number(offset)
  return await productDao.getProductListByCategory(category_id, offset);
}

const productListByOrder = async (category_id, sort, offset) => {
  if(sort === "popular") orderBy = "ORDER BY p_l.count DESC"
    else if(sort === "volume") orderBy = "ORDER BY p.sales_volume DESC"
    else if(sort === "created") orderBy = "ORDER BY p.created_at"
    else if(sort === "priceAesc") orderBy = "ORDER BY for_ORDER"
    else if(sort === "priceDesc") orderBy = "ORDER BY for_ORDER DESC"

  return await productDao.getProductListByOrder(category_id, orderBy, offset)
}

module.exports = { mainProductList, productListByCategory, productListByOrder }