const myDataSource = require('./init');

// const getProductReviews = async (pk) => {
//   const result = await myDataSource.query(`
// SELECT 
//     users.name,
//     reviews.rate,
//     reviews.review_title,
//     reviews.review_content,
//     reviews.review_image,
//     reviews.created_at,
//     (select round((select avg(rate) from reviews where reviews.product_id = ?),1)) as avg_rate,
//     (select count(*) from reviews where reviews.product_id = ?) as review_count
//   from reviews
//   join users on users.id = reviews.user_id
//   where reviews.product_id=?`, [pk, pk, pk])
//   return result
// }

// const getProductReviews = async (pk) => {
//   const result = await myDataSource.query(`
// SELECT 
// (select round((select avg(rate) from reviews where reviews.product_id = ?),1)) as avg_rate,
// (select count(*) from reviews where reviews.product_id = ?) as review_count,
//     JSON_ARRAYAGG(JSON_OBJECT(
//      "user_name",users.name,
//      "id",reviews.id,
//      "rate",reviews.rate,
//      "review_title",reviews.review_title,
//      "review_content",reviews.review_content,
//      "review_image",reviews.review_image,
//      "time",reviews.created_at
//    ))as review from reviews   
//   join users on users.id = reviews.user_id
//   where reviews.product_id=?
//   order by reviews.created_at`, [pk, pk, pk, pk])
//   return result
// }

// const getProductReviews = async (pk) => {
//   const result = await myDataSource.query(`
// SELECT 
//     JSON_ARRAYAGG(JSON_OBJECT(
//      "user_name",users.name,
//      "id",reviews.id,
//      "rate",reviews.rate,
//      "review_title",reviews.review_title,
//      "review_content",reviews.review_content,
//      "review_image",reviews.review_image,
//      "time",reviews.created_at
//    ))as review from reviews   
//   join users on users.id = reviews.user_id
//   where reviews.product_id=?
//   order by desc reviews.created_at`, [pk, pk, pk, pk])
//   return result
// }

const getProductReviews = async (pk) => {
  const result = await myDataSource.query(`
  select
  reviews.id,
  users.name,
  users.user_image,
  reviews.rate,
  reviews.review_content,
  date_format(reviews.created_at, '%Y-%m-%d') as date
  from reviews
  join users on users.id = reviews.user_id
  join products on products.id = reviews.product_id
  where reviews.product_id = ?
  order by reviews.created_at desc
  `, [pk, pk])
  return result
}

const checkOrder = async (user_id, product_id) => {
  return await myDataSource.query(`
  select * from order_list where user_id = ? and product_id = ?`, [user_id, product_id]);
}

const getProductId = async (pk) => {
  return await myDataSource.query(`
  select
  user_id,
  product_id
  from order_list
  where order_list.id = ?`, [pk])
}

const createProductReviews = async (user_id, product_id, rate, review_content) => {
  return await myDataSource.query(`
  insert into reviews(user_id, product_id, rate, review_content)
  values(?,?,?,?)`, [user_id, product_id, rate, review_content])
}

module.exports = { getProductReviews, createProductReviews, checkOrder, getProductId }
