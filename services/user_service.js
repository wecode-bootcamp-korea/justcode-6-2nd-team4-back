const userDao = require('../models/user_dao');
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const logInService = async (email, password) => {
    const userEmailPw = await userDao.getUserByEmail(email);
    if (!userEmailPw) {
      const error = new Error('USER_NOT_EXISTE');
      error.statusCode = 400;
      throw error;
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, userEmailPw.password);
  
    if (!isPasswordCorrect) {
      const error = new Error('PASSWORD_INCORRECTED');
      error.statusCode = 400;
      throw error;
    } else if (isPasswordCorrect) {
      const token = jwt.sign({ userEmail: userEmailPw.email }, SECRET_KEY, {
        expiresIn: '1d',
      });
  
    //   const user = {};
    //   user["account"] = userIdPw["account"]
    //   user["token"] = token
    //   return user;
    }
  
}

module.exports = { logInService }