const productService = require("../services/product_service")


const mainPageList = async (req, res) => {
  try{
    const dataList = await productService.mainProductList();
    res.status(200).json({ main: dataList })
  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

const categoryPageList = async (req, res) => {
  const category_id = req.params.id
  const { offset } = req.query
  try{
    const dataList = await productService.productListByCategory(category_id, offset);
    res.status(200).json({ data: dataList })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

const sortProductList = async (req, res) => {
  const category_id = req.params.id
  const { offset, sort } = req.query
  try{
    const dataList = await productService.productListByOrder(category_id, sort, offset);
    res.status(200).json({ data: dataList })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

module.exports = { mainPageList, categoryPageList, sortProductList }
