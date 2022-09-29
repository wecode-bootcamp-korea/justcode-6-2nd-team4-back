const cartService = require('../services/cart_service')

const createCart = async (req, res) => {
  const { id } = req.foundUser;
  const { productId, deliveryFee, options } = req.body;
  console.log("oaption : ", options)
  try{
    await cartService.insertProductToCart(id, productId, deliveryFee, options);
    res.status(200).json({ message: "장바구니에 담겼습니다." })
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}

const readCart = async (req, res) => {
  const { id } = req.foundUser;
  try{
    const list = await cartService.readProductInCart(id)
    res.status(200).json( list )
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}

const updateCart = async (req, res) => {
  const { cart_id, quantity, price } = req.body;
  try{
    await cartService.updateCart(cart_id, quantity, price)
    res.status(200).json()
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}

const deleteCart = async (req, res) => {
  const { cart_id } = req.body;
  try{
    await cartService.deleteCart(cart_id)
    res.status(204).json();
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}

module.exports = {
  createCart,
  readCart,
  updateCart,
  deleteCart
}