const myPageDao = require('../models/mypage_dao');

const getUserProfile = async (pk) => {
  return await myPageDao.getUserProfile(pk);
}

const getUserInfo = async (pk) => {
  return await myPageDao.getUserInfo(pk);
}

const getUserOrder = async (pk) => {
  return await myPageDao.getUserOrder(pk);
}

const getUserLikeList = async (pk) => {
  return await myPageDao.getUserLikeList(pk);
}


module.exports = { getUserProfile, getUserInfo, getUserOrder, getUserLikeList }