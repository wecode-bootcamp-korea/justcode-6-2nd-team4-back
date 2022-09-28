const myDataSource = require('./init');

const createOrder = async (pk) => {
  return await myDataSource.query(`
insert into order_list (user_id, product_id, product_quantity)
select user_id, product_id, product_quantity
from cart_order
where cart_order.user_id = ?`, [pk])
}

module.exports = { createOrder }