const myDataSource = require('./init');

const getUserProfile = async (pk) => {
  const userprofile = await myDataSource.query(`
  select
  user_image,
  name
  from users
  where users.id = ?`, [pk]);
  return userprofile
}

const getUserInfo = async (pk) => {
  const userinfo = await myDataSource.query(`
  select
  name,
  phone,
  email,
  address.address,
  address.detailed_address
  from users
  join address on users.id = address.user_id
  where users.id = ?`, [pk]);
  return userinfo
}

const getUserOrder = async (pk) => {
  return await myDataSource.query(`
  select
  order_list.id,
  date_format(order_list.created_at, '%Y-%m-%d') as date ,
  products.id as product_id,
  products.name,
  products.thumbnail_image,
  sellers.name as seller_name,
  products.origin_price,
  order_list.product_quantity
  from order_list
  join products on products.id = order_list.product_id
  join sellers on sellers.id = order_list.seller_id
  where order_list.user_id = ? 
  `, [pk])
};


const getUserLikeList = async (pk) => {
  return await myDataSource.query(`
select
product_liked.id,
products.name,
products.thumbnail_image,
(sellers.name) as seller_name
from products
join sellers on sellers.id = products.seller_id
join product_liked on products.id = product_liked.product_id
join users on users.id = product_liked.user_id
where users.id = ? AND product_liked.is_liked = 1`, [pk])
}

module.exports = { getUserProfile, getUserInfo, getUserOrder, getUserLikeList }