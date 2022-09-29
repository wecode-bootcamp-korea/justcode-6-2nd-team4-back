const productDao = require('../models/product_dao');

const mainProductList = async () => {
  const list = {}
  list.new = await productDao.getProductListInMonth();
  list.popular = await productDao.getProductListByLiked();  
  return list;
}

// 카테고리별 메인 상품 리스트 포함
const productListByOrder = async (category_id, sort, offset) => {
  offset = Number(offset)
  if(sort === "main") orderBy = "ORDER BY p_l.count DESC"
    else if(sort === "popular") orderBy = "ORDER BY p_l.count DESC"
    else if(sort === "volume") orderBy = "ORDER BY p.sales_volume DESC"
    else if(sort === "created") orderBy = "ORDER BY p.created_at"
    else if(sort === "priceAesc") orderBy = "ORDER BY for_ORDER"
    else if(sort === "priceDesc") orderBy = "ORDER BY for_ORDER DESC"
  return await productDao.getProductListByOrder(category_id, orderBy, offset)
}

module.exports = { mainProductList, productListByOrder }