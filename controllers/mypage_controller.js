const myPageServices = require('../services/mypage_service');

const getUserMyPage = async (req, res) => {
  const { id } = req.foundUser;

  try {
    const profile = await myPageServices.getUserProfile(id)
    const info = await myPageServices.getUserInfo(id);
    return res.status(201).json({ profile, info })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getUserOrder = async (req, res) => {
  const { id } = req.foundUser;
  
  try {
    const order = await myPageServices.getUserOrder(id)
    return res.status(201).json({ order })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
}

const getUserLikeList = async (req, res) => {
  const { id } = req.foundUser;

  try {
    const LikeList = await myPageServices.getUserLikeList(id)
    return res.status(201).json({ LikeList })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
}

module.exports = { getUserMyPage, getUserOrder, getUserLikeList }