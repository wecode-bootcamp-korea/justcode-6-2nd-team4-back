const myDataSource = require('./init');

const getTotalCountOfProductByCategory = async (category_id) => {
  const queryRes = await myDataSource.query(`
  SELECT
    COUNT(p.id) AS total_count
  FROM products p
  WHERE p.category_id = ? + 7
  `, [category_id])
  return queryRes;
}

const getProductListInMonth = async () => {
  const queryRes = await myDataSource.query(`
  SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.thumbnail_image AS image,
    CONCAT(p.sale_rate, "%") AS sale_rate,
    CASE
      WHEN p.sale_rate IS null 
      THEN REPLACE(p.origin_price, '.', ',')
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price), 0)
    END AS price,
    s.name AS shop,
    CASE
      WHEN s.delivery_condition = '무료배송'
      THEN null
      ELSE 1
    END AS delivery_type,
    c.name AS category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) AS average, COUNT(id) AS review_count 
    FROM reviews
    GROUP BY product_id) AS r
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
    p.id AS product_id,
    p.name AS product_name,
    p.thumbnail_image AS image,
    CONCAT(p.sale_rate, "%") AS sale_rate,
    CASE
      WHEN p.sale_rate IS null 
      THEN FORMAT(p.origin_price, 0)
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price), 0)
    END AS price,
    s.name AS shop,
    CASE
      WHEN s.delivery_condition = '무료배송'
      THEN null
      ELSE 1
    END AS delivery_type,
    c.name AS category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) AS average, COUNT(id) AS review_count
    FROM reviews
    GROUP BY product_id) AS r
  ON p.id = r.product_id
  LEFT JOIN
    (SELECT product_id, COUNT(product_id) AS count
    FROM product_liked
    GROUP BY product_id) AS p_l
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

const getProductListByCategory = async (category_id, orderBy, offset) => {
  const queryRes = myDataSource.query(`
  SELECT 
	(SELECT COUNT(id) FROM products p WHERE p.category_id = ? + 7) AS total_count,
    p.id AS product_id,
    p.name AS product_name,
    p.thumbnail_image AS image,
    CONCAT(p.sale_rate, "%") AS sale_rate,
    CASE
      WHEN p.sale_rate IS null 
      THEN FORMAT(p.origin_price, 0)
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price), 0)
    END AS price,
    s.name AS shop,
    CASE
      WHEN s.delivery_condition = '무료배송'
      THEN null
      ELSE 1
    END AS delivery_type,
    c.name AS category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) AS average, COUNT(id) AS review_count
    FROM reviews
    GROUP BY product_id) AS r
  ON p.id = r.product_id
  LEFT JOIN
    (SELECT product_id, COUNT(product_id) AS count
    FROM product_liked
    GROUP BY product_id) AS p_l
  ON p.id = p_l.product_id
  JOIN category c
  ON p.category_id = c.id
  JOIN sellers s
  ON p.seller_id = s.id
  WHERE p.category_id = ? + 7
  ${orderBy}
  LIMIT 0, ?`, [category_id, category_id, (offset + 1) * 8])
  return queryRes;
}

const getProductListByOrder = async (category_id, orderBy, offset) => {
  const queryRes = await myDataSource.query(`
  SELECT 
    (SELECT COUNT(id) FROM products p WHERE p.category_id = ? + 7) AS total_count,
    p.id AS product_id,
    p.name AS product_name,
    p.thumbnail_image AS image,
    CONCAT(p.sale_rate, "%") AS sale_rate,
    CAST(
    (CASE
      WHEN p.sale_rate IS null 
      THEN FORMAT(p.origin_price, 0)
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price), 0)
    END) AS DECIMAL(6, 3)) AS for_ORDER,
    REPLACE(
    (CASE
      WHEN p.sale_rate IS null 
      THEN FORMAT(p.origin_price, 0)
      ELSE FORMAT(FLOOR((1-(p.sale_rate * 0.01)) * p.origin_price), 0)
    END),'.', ',') AS price,
    s.name AS shop,
    CASE
      WHEN s.delivery_condition = '무료배송' 
      THEN null
      ELSE 1
    END AS delivery_type,
    c.name AS category,
    r.average,
    r.review_count
  FROM products p
  LEFT JOIN 
    (SELECT product_id, TRUNCATE(AVG(rate), 1) AS average, COUNT(id) AS review_count
    FROM reviews
    GROUP BY product_id) AS r
  ON p.id = r.product_id
  LEFT JOIN
    (SELECT product_id, COUNT(product_id) AS count
    FROM product_liked
    GROUP BY product_id) AS p_l
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