const cartDao = require('../models/cart_dao')

const insertProductToCart = async (user_id, product_id, delivery_fee, order_options) => {
  const optionArray = []; // 상세페이지에서 선택한 option
  const cartOptionArray = []; // 기존 장바구니의 option

  order_options.map((order) => {optionArray.push(order.option)})
  const isCartExisted = await cartDao.getCartByUserProductId(user_id, product_id)
  isCartExisted.map((cart) => { cartOptionArray.push(cart.options) })

  const isOptionExisted = optionArray.filter(option => cartOptionArray.includes(option))
  if(isOptionExisted.length === 0) {
    delivery_fee = parseFloat(delivery_fee/1000).toFixed(3)
    order_options.map(async (order) => {
      // order_price, delivery_fee >> decimal 형식으로
      order.price = parseFloat(order.price/1000).toFixed(3)
      await cartDao.createCart(user_id, product_id, order.quantity, order.option, order.price, delivery_fee)
    })
  } else if(isOptionExisted) {
    const id = []; // input option과 option이 일치하는 장바구니의 cart_id
    const quantity = []; // input의 option별 quantity (option을 기준으로 값을 가져옴)
    const price = [];

    isOptionExisted.filter(option => {cartOptionArray.includes(option)})
    for(let i = 0; i < isOptionExisted.length; i++) {
      const cartId = await cartDao.getCartIdByOptions(isOptionExisted[i])
      id.push(cartId.cart_id)
      for(let j in order_options) {
        if(order_options[j].option === isOptionExisted[i]) {
          quantity.push(order_options[j].quantity)
          price.push(order_options[j].price)
        } }
    }
    id.map(async (id, j) => {
    price[j] = parseFloat(price[j]/1000).toFixed(3)
    await cartDao.updateQuantity(id, quantity[j], price[j])
    })
}}


const readProductInCart = async (user_id) => {
  const cartList = await cartDao.getCartByUserId(user_id)
  cartList['cart'] = JSON.parse(cartList['cart'])
  return cartList;
}

const updateCart = async (cart_id, newQuantity, newPrice) => {
  newPrice = parseFloat(newPrice/1000).toFixed(3)
  return await cartDao.updateCart(cart_id, newQuantity, newPrice)
}

const deleteCart = async (cart_id) => {
  await cartDao.deleteCart(cart_id);
}



module.exports = {
  insertProductToCart,
  readProductInCart,
  updateCart,
  deleteCart
}