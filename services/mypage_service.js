const myPageDao = require('../models/mypage_dao');

const getUserProfile = async (user_id) => {
  return await myPageDao.getUserProfile(user_id);
}

const getUserInfo = async (user_id) => {
  return await myPageDao.getUserInfo(user_id);
}

const getUserOrder = async (user_id) => {
  return await myPageDao.getUserOrder(user_id);
}

const getUserLikeList = async (user_id) => {
  return await myPageDao.getUserLikeList(user_id);
}


module.exports = { getUserProfile, getUserInfo, getUserOrder, getUserLikeList }