const myDataSource = require('./init')

const createCart = async (user_id, product_id, quantity, options, price, delivery_fee) => {
  await myDataSource.query(`
  INSERT INTO cart_order (user_id, product_id, product_quantity, product_options, order_price, delivery_fee)
  VALUES (?,?,?,?,?,?)
  `, [user_id, product_id, quantity, options, price, delivery_fee])
}

const getCartByUserProductId = async (user_id, product_id) => {
  const queryRes = await myDataSource.query(`
  SELECT id, product_options AS options FROM cart_order WHERE user_id =? AND product_id = ?
  `, [user_id, product_id])
  return queryRes;
}

const getOrderPriceByUserId = async (user_id) => {
  const [queryRes] = await myDataSource.query(`
  SELECT * FROM cart_order WHERE user_id = ?
  `, [user_id])
  return queryRes;
}

const getCartByUserId = async (user_id) => {
  const [queryRes] = await myDataSource.query(`
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
    "cart_id", c.id,
    "product_id", c.product_id,
    "options", c.product_options,
    "quantity", c.product_quantity,
    "image", p.thumbnail_image,
    "product_price", p.origin_price,
    "price", c.order_price,
    "delivery_fee", c.delivery_fee,
    "name", p.name,
    "period", s.production_period,
    "allPrice", 
    CASE
      WHEN c.delivery_fee IS not null
      THEN (c.order_price + c.delivery_fee)
      ELSE c.order_price
    END,
    "shop", s.name
    )) as cart
  FROM cart_order c
  JOIN products p
  ON c.product_id = p.id
  JOIN sellers s
  ON p.seller_id = s.id
  WHERE c.user_id = ?
  GROUP BY c.user_id
`, [user_id])
  return queryRes;
}

const getCartIdByOptions = async (user_id, product_id, option) => {
  const[queryRes] = await myDataSource.query(`
  SELECT id AS cart_id FROM cart_order WHERE product_options = ? AND user_id = ? AND product_id = ?
  `, [option, user_id, product_id])
  return queryRes;
}

// 수량 변경 시
const getCartByCartId = async (cart_id) => {
  const [queryRes] = await myDataSource.query(`
  SELECT c.product_quantity,
  FORMAT(CASE
    WHEN p.sale_rate IS null
	  THEN p.origin_price * c.product_quantity
	  ELSE FLOOR((1 - p.sale_rate * 0.01) * p.origin_price) * c.product_quantity
  END, 0) AS price,
  CASE 
    WHEN (CASE
      WHEN p.sale_rate IS null
	    THEN p.origin_price * c.product_quantity
	    ELSE FLOOR((1 - p.sale_rate * 0.01) * p.origin_price) * 1000 * c.product_quantity
      END) >= s.delivery_condition
    THEN null
    ELSE REPLACE(s.delivery_fee, '.', ',')
  END AS delivery_fee
  FROM cart_order c
  JOIN products p ON c.product_id = p.id
  JOIN sellers s ON p.seller_id = s.id
  WHERE c.id = ?
  `, [cart_id])
  return queryRes;
}

const updateQuantity = async (cart_id, newQuantity, newPrice) => {
  await myDataSource.query(`
  UPDATE cart_order SET product_quantity = 
  (SELECT alias.product_quantity + ?
  FROM (
    SELECT id, product_quantity 
    FROM cart_order WHERE id = ?) AS alias
  ),
  order_price = 
  (SELECT alias2.order_price + ?
  FROM (
    SELECT id, order_price 
    FROM cart_order WHERE id = ?) AS alias2
  )
  WHERE id = ?
  `, [newQuantity, cart_id, newPrice, cart_id, cart_id])
}

const updateCart = async (cart_id, newQuantity, newPrice) => {
  await myDataSource.query(`
  UPDATE cart_order SET 
  product_quantity = ?,
  order_price = ?
  WHERE id = ?
  `, [newQuantity, newPrice, cart_id])
}

const deleteCart = async (cart_id) => {
  await myDataSource.query(`
  DELETE FROM cart_order WHERE id = ?
  `, [cart_id])
}

module.exports = {
  getCartByUserProductId,
  getOrderPriceByUserId,
  createCart,
  getCartIdByOptions,
  getCartByUserId,
  getCartByCartId,
  updateQuantity,
  updateCart,
  deleteCart
}