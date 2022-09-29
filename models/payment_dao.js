const myDataSource = require('./init');

const createOrder = async (user_id) => {
  return await myDataSource.query(`
  INSERT INTO order_list (user_id, product_id, product_quantity, seller_id)
  ( SELECT DISTINCT user_id, product_id, product_quantity, sellers.id
    FROM cart_order
    JOIN products
    ON cart_order.product_id = products.id
    JOIN sellers
    ON products.seller_id = sellers.id
    WHERE cart_order.user_id = ?)`, [user_id])
}

const deleteCart = async(user_id) => {
  return await myDataSource.query(`
  DELEtE FROM cart_order
  where user_id = ? 
  `,[user_id])
}

module.exports = { createOrder, deleteCart}