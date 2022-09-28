const myDataSource = require('./init');

const getProductDetails = async (pk, user_pk) => {
  const result = await myDataSource.query(`
select DISTINCT
  sellers.id,
  sellers.profile_image,
  sellers.name as name,
  sellers.production_period,
  sellers.delivery_condition,
  sellers.delivery_fee,
  sellers.prohibited_deliver_area,
  products.id,
  products.name as product_name,
  products.seller_id,
  products.origin_price,
  products.thumbnail_image,
  products.image_url,
  products.content,
  (select round((select avg(rate) from reviews where reviews.product_id = ?),1)) as avg_rate,
  (select count(*) from reviews where reviews.product_id = ?) as review_count,
  (select count(is_liked) from product_liked where product_liked.is_liked = 1 AND product_liked.product_id = ?) as like_count,
  (select is_liked from product_liked where product_liked.product_id = ? AND product_liked.user_id =?) as is_liked
  from products
  join sellers on products.seller_id = sellers.id
  join product_liked on products.id = product_liked.product_id
  where products.id = ?`
    , [pk, pk, pk, pk, user_pk, pk])
  return result
}

const getProductDetailOpton = async (pk) => {
  const result = await myDataSource.query(`
select 
product_options.id as id,
product_options.name as title,
    json_arrayagg(
       json_object(
         "id", product_options_detail.products_options_id,
         'price', product_options_detail.price,
         'title', product_options_detail.title
       )) as detail
   from workshop.product_options_detail
   left outer join workshop.product_options on product_options.id = product_options_detail.products_options_id
   where product_options.products_id = ?
   group by product_options_detail.products_options_id;
  ;`, [pk])
  return result
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


module.exports = { getProductDetailOpton, getProductDetails, updateIsLiked }



