const myDataSource = require('./init');

const getProductDetails = async (product_id, user_id) => {
  const result = await myDataSource.query(`
  SELECT DISTINCT
    sellers.id,
    sellers.profile_image,
    sellers.name AS name,
    sellers.production_period,
    sellers.delivery_condition,
    sellers.delivery_fee,
    sellers.prohibited_deliver_area,
    products.id,
    products.name AS product_name,
    products.seller_id,
    products.origin_price,
    products.thumbnail_image,
    products.image_url,
    products.content,
    (SELECT ROUND((SELECT AVG(rate) FROM reviews WHERE reviews.product_id = ?),1)) AS avg_rate,
    (SELECT COUNT(*) FROM reviews WHERE reviews.product_id = ?) AS review_count,
    (SELECT COUNT(is_liked) FROM product_liked WHERE product_liked.is_liked = 1 AND product_liked.product_id = ?) AS like_count,
    (SELECT is_liked FROM product_liked WHERE product_liked.product_id = ? AND product_liked.user_id = ?) AS is_liked
  FROM products
  JOIN sellers ON products.seller_id = sellers.id
  WHERE products.id = ?
  `, [product_id, product_id, product_id, product_id, user_id, product_id])
  return result
}

const getProductDetailOption = async (product_id) => {
  const result = await myDataSource.query(`
  SELECT 
    product_options.id AS id,
    product_options.title AS title,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        "id", product_options_detail.id,
        "price", product_options_detail.price,
        "title", product_options_detail.title
    )) AS detail
  FROM workshop.product_options_detail
  LEFT OUTER JOIN workshop.product_options ON product_options.id = product_options_detail.products_options_id
  WHERE product_options.products_id = ?
  GROUP BY product_options_detail.products_options_id;
  `, [product_id])
  return result
}


const checkLiked = async (pk, user_id) => {
  return await myDataSource.query(`
  select
  user_id,
  product_id
  from product_liked
  where user_id =? and product_id = ?`, [user_id, pk])
}

const insertIsLiked = async (pk, user_id) => {
  await myDataSource.query(`
  insert into product_liked(user_id, product_id, is_liked)
  values(?,?,1)`, [user_id, pk])
  return await myDataSource.query(`
  select distinct
(select count(is_liked) from product_liked where product_liked.is_liked = 1 AND product_liked.product_id = ?) as like_count,
(select is_liked from product_liked where product_liked.product_id = ? AND product_liked.user_id =?) as is_liked
  from product_liked
  `, [pk, pk, user_id])
}

const updateIsLiked = async (pk, user_id) => {
  await myDataSource.query(`
  update product_liked
  set is_liked = CASE
  when is_liked = 1 then 0
  when is_liked = 0 then 1
  end
  where product_id = ? and user_id=? `, [pk, user_id])
  return await myDataSource.query(`
  select distinct
(select count(is_liked) from product_liked where product_liked.is_liked = 1 AND product_liked.product_id = ?) as like_count,
(select is_liked from product_liked where product_liked.product_id = ? AND product_liked.user_id =?) as is_liked
  from product_liked
  `, [pk, pk, user_id])
}

module.exports = { getProductDetailOption, getProductDetails,checkLiked, insertIsLiked,  updateIsLiked }