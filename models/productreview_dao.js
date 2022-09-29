const myDataSource = require('./init');

const getProductReviews = async (product_id) => {
  return await myDataSource.query(`
  SELECT
    reviews.id,
    users.name,
    users.user_image,
    reviews.rate,
    reviews.review_content,
    DATE_FORMAT(reviews.created_at, '%y-%m-%d') AS date
  FROM reviews
  JOIN users ON users.id = reviews.user_id
  JOIN products ON products.id = reviews.product_id
  WHERE reviews.product_id = ?
  ORDER BY reviews.created_at DESC
  `, [product_id])
}

const checkOrder = async (user_id, product_id) => {
  return await myDataSource.query(`
  SELECT * FROM order_list WHERE user_id = ? AND product_id = ?`, [user_id, product_id]);
}

const getProductId = async (product_id) => {
  return await myDataSource.query(`
  SELECT
    user_id,
    product_id
  FROM order_list
  WHERE order_list.id = ?`, [product_id])
}

const createProductReviews = async (user_id, product_id, rate, review_content) => {
  return await myDataSource.query(`
  INSERT INTO reviews (user_id, product_id, rate, review_content)
  VALUES (?,?,?,?)`, [user_id, product_id, rate, review_content])
}

module.exports = { getProductReviews, createProductReviews, checkOrder, getProductId }
