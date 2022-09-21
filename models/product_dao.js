const myDataSource = require('./init');

const getProductListInMonth = async () => {
  const queryRes = await myDataSource.query(`
    SELECT 
      p.id as product_id,
      p.name as product_name,
      p.thumbnail_image as image,
      REPLACE(p.origin_price, '.', ',') as price,
      p.sale_rate as sale,
      s.name as shop,
      
    FROM products p,
    JOIN sellers s
    ON p.seller_id = s.id
    한달 기간 
    LIMIT 16
  `)

  return queryRes;
}

const getProductListByLiked = async () => {
  const queryRes = await myDataSource.query(`
    
  `)

  return queryRes;
}




module.exports = { getProductListInMonth, getProductListByLiked }