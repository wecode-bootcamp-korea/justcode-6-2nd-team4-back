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
  const { page } = req.body
  try{
    const dataList = await productService.productListByCategory(category_id, page);
    res.status(200).json({ data: dataList })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}


const sortProductList = async (req, res) => {
  const category_id = req.params.id
  const { sort } = req.query
  const { page } = req.body
  try{
    const dataList = await productService.productListByOrder(category_id, sort, page);
    res.status(200).json({ data: dataList })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

module.exports = { mainPageList, categoryPageList, sortProductList }
