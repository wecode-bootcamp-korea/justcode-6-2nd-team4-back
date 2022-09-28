const myPageServices = require('../services/mypage_service');

const getUserMyPage = async (req, res) => {
  const pk = req.params.pk;

  try {
    const profile = await myPageServices.getUserProfile(pk)
    const info = await myPageServices.getUserInfo(pk);
    return res.status(201).json({ profile, info })
  }

  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getUserOrder = async (req, res) => {
  const pk = req.params.pk;

  try {
    const order = await myPageServices.getUserOrder(pk)
    return res.status(201).json({ order })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
}

const getUserLikeList = async (req, res) => {
  const pk = req.params.pk;

  try {
    const LikeList = await myPageServices.getUserLikeList(pk)
    return res.status(201).json({ LikeList })
  }
  catch (err) {
    console.log(err)
    res.status(err.status || 500).json({ message: err.message })
  }
}

module.exports = { getUserMyPage, getUserOrder, getUserLikeList }