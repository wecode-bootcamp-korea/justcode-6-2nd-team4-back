const myDataSource = require('./init');

const getTotalCountOfProductByCategory = async (category_id) => {
  const queryRes = await myDataSource.query(`
  SELECT
    count(p.id) as total_count
  FROM products p
  WHERE p.category_id = ? + 7
  `, [category_id])
  return queryRes;
}

const getProductListInMonth = async () => {
  const queryRes = await myDataSource.query(`
  SELECT 
    p.id as product_id,
    p.name as product_name,
    p.thumbnail_image as image,
    CONCAT(p.sale_rate, "%") as sale_rate,
    CASE
      WHEN p.sale_rate IS null 
      THEN REPLACE(p.origin_price, '.', ',')
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price)*1000, 0)
    END as price,
    s.name as shop,
    CASE
      WHEN s.delivery_condition = '무료배송'
      THEN null
      ELSE 1
    END as delivery_type,
    c.name as category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) as average, COUNT(id) as review_count 
    FROM reviews
    GROUP BY product_id) as r
  ON p.id = r.product_id
  JOIN category c
  ON p.category_id = c.id
  JOIN sellers s
  ON p.seller_id = s.id
  WHERE p.created_at BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH ) AND NOW()
  ORDER BY p.created_at
  LIMIT 16
  `)

  return queryRes;
}

const getProductListByLiked = async () => {
  const queryRes = await myDataSource.query(`
  SELECT 
    p.id as product_id,
    p.name as product_name,
    p.thumbnail_image as image,
    CONCAT(p.sale_rate, "%") as sale_rate,
    CASE
      WHEN p.sale_rate IS null 
      THEN REPLACE(p.origin_price, '.', ',')
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price)*1000, 0)
    END as price,
    s.name as shop,CASE
    WHEN s.delivery_condition = '무료배송'
      THEN null
      ELSE 1
    END as delivery_type,
    c.name as category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) as average, COUNT(id) as review_count
    FROM reviews
    GROUP BY product_id) as r
  ON p.id = r.product_id
  LEFT JOIN
    (SELECT product_id, COUNT(product_id) as count
    FROM product_liked
    GROUP BY product_id) as p_l
  ON p.id = p_l.product_id
  JOIN category c
  ON p.category_id = c.id
  JOIN sellers s
  ON p.seller_id = s.id
  ORDER BY p_l.count DESC
  LIMIT 16
  `)

  return queryRes;
}

const getProductListByCategory = async (category_id, offset) => {
  const queryRes = myDataSource.query(`
  SELECT 
	(SELECT COUNT(id) FROM products p WHERE p.category_id = ? + 7) as total_count,
    p.id as product_id,
    p.name as product_name,
    p.thumbnail_image as image,
    CONCAT(p.sale_rate, "%") as sale_rate,
    CASE
      WHEN p.sale_rate IS null 
      THEN REPLACE(p.origin_price, '.', ',')
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price)*1000, 0)
    END as price,
    s.name as shop,
    CASE
      WHEN s.delivery_condition = '무료배송'
      THEN null
      ELSE 1
    END as delivery_type,
    c.name as category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) as average, COUNT(id) as review_count
    FROM reviews
    GROUP BY product_id) as r
  ON p.id = r.product_id
  LEFT JOIN
    (SELECT product_id, COUNT(product_id) as count
    FROM product_liked
    GROUP BY product_id) as p_l
  ON p.id = p_l.product_id
  JOIN category c
  ON p.category_id = c.id
  JOIN sellers s
  ON p.seller_id = s.id
  WHERE p.category_id = ? + 7
  ORDER BY p_l.count DESC
  LIMIT 0, ?`, [category_id, category_id, (offset + 1) * 8])
  return queryRes;
}

const getProductListByOrder = async (category_id, orderBy, offset) => {
  const queryRes = await myDataSource.query(`
  SELECT 
    (SELECT COUNT(id) FROM products p WHERE p.category_id = ? + 7) as total_count,
    p.id as product_id,
    p.name as product_name,
    p.thumbnail_image as image,
    CONCAT(p.sale_rate, "%") as sale_rate,
    CAST(
    (CASE
      WHEN p.sale_rate IS null 
      THEN REPLACE(p.origin_price, '.', ',')
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price)*1000, 0)
    END) AS DECIMAL(6, 3)) AS for_ORDER,
    REPLACE(
    (CASE
      WHEN p.sale_rate IS null 
      THEN REPLACE(p.origin_price, '.', ',')
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price)*1000, 0)
    END),'.', ',') AS price,
    s.name as shop,
    CASE
      WHEN s.delivery_condition = '무료배송' 
      THEN null
      ELSE 1
    END as delivery_type,
    c.name as category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) as average, COUNT(id) as review_count
    FROM reviews
    GROUP BY product_id) as r
  ON p.id = r.product_id
  LEFT JOIN
    (SELECT product_id, COUNT(product_id) as count
    FROM product_liked
    GROUP BY product_id) as p_l
  ON p.id = p_l.product_id
  JOIN category c
  ON p.category_id = c.id
  JOIN sellers s
  ON p.seller_id = s.id
  WHERE p.category_id = ? + 7
  ${orderBy}
  LIMIT 0, ?
  `, [category_id, category_id, (offset + 1) * 8])
  return queryRes;
}


module.exports = { 
  getTotalCountOfProductByCategory,
  getProductListInMonth,
  getProductListByLiked,
  getProductListByCategory,
  getProductListByOrder
}