const myDataSource = require('./init');

const getUserProfile = async (user_id) => {
  return  await myDataSource.query(`
  SELECT
    user_image,
    name
  FROM users
  WHERE users.id = ?`, [user_id]);
}

const getUserInfo = async (user_id) => {
  return await myDataSource.query(`
  SELECT
    name,
    phone,
    email,
    address.address,
    address.detailed_address
  FROM users
  JOIN address ON users.id = address.user_id
  WHERE users.id = ?`, [user_id]);
}

// price 수정함 >> FORMAT 적용??
const getUserOrder = async (user_id) => {
  return await myDataSource.query(`
  SELECT
    order_list.id,
    DATE_FORMAT(order_list.created_at, '%y-%m-%d') AS date ,
    products.id AS product_id,
    products.name,
    products.thumbnail_image,
    sellers.name AS seller_name,
    products.origin_price,
    order_list.product_quantity
  FROM order_list
  JOIN products ON products.id = order_list.product_id
  JOIN sellers ON sellers.id = order_list.seller_id
  WHERE order_list.user_id = ? 
  `, [user_id])
};


const getUserLikeList = async (user_id) => {
  return await myDataSource.query(`
  SELECT
    product_liked.id,
    products.name,
    products.thumbnail_image,
    sellers.name AS seller_name
  FROM products
  JOIN sellers ON sellers.id = products.seller_id
  JOIN product_liked ON products.id = product_liked.product_id
  JOIN users ON users.id = product_liked.user_id
  WHERE users.id = ? AND product_liked.is_liked = 1`, [user_id])
}

module.exports = { getUserProfile, getUserInfo, getUserOrder, getUserLikeList }