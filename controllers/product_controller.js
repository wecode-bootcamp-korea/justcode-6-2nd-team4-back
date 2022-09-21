const productService = require("../services/product_service")


const mainPageList = async (req, res) => {
  // 전체 상품에서 한 달 간의 신상품
  // 전체 상품에서 인기 상품 리스트 - 좋아요 순
  try{
    const dataList = await productService.productList();
    res.status(200).json({ dataList })
  } catch (error){
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}



module.exports = { mainPageList }