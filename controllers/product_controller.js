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



module.exports = { mainPageList }
