const userDao = require('../models/user_dao');
const bcrypt = require('bcryptjs')

const signUpService = async (email, password, name, phone) => {

  await userDao.getUserByEmail(email);
  await userDao.getUserByPhone(phone); // 폰 인증번호 전송은 후순위

  const salt = bcrypt.genSaltSync(12);
  const hashedPw = bcrypt.hashSync(password, salt);
  return await userDao.createUser(email, hashedPw, name, phone)
}

module.exports = { signUpService }