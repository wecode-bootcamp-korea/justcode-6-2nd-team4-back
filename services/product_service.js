const productDao = require('../models/product_dao');

const mainProductList = async () => {
  const list = {}
  list.new = await productDao.getProductListInMonth();
  list.popular = await productDao.getProductListByLiked();  
  return list;
}

const productListByCategory = async (category_id, page) => {
  const totalCount = await productDao.getTotalCountOfProductByCategory(category_id)
  const list = await productDao.getProductListByCategory(category_id, page)
  const res = [
    ...totalCount,
    ...list
  ]
  return res;
}

const productListByOrder = async (category_id, sort, page) => {
  if(sort === "popular") orderBy = "ORDER BY p_l.count DESC"
    else if(sort === "volume") orderBy = "ORDER BY p.sales_volume DESC"
    else if(sort === "created") orderBy = "ORDER BY p.created_at"
    else if(sort === "priceAesc") orderBy = "ORDER BY p.origin_price"
    else if(sort === "priceDesc") orderBy = "ORDER BY p.origin_price DESC"

  const totalCount = await productDao.getTotalCountOfProductByCategory(category_id)
  const list = await productDao.getProductListByOrder(category_id, orderBy, page)
  const res = [
    ...totalCount,
    ...list
  ]
  return res;
}

module.exports = { mainProductList, productListByCategory, productListByOrder }