const myDataSource = require('./init');

const getUserByEmail = async email => {
  const [queryRes] = await myDataSource.query(
    `SELECT id, email, password, name FROM users WHERE email = ?`,
    [email]
  );
  return queryRes;
};

const getUserByPhone = async phone => {
  const [queryRes] = await myDataSource.query(
    `SELECT email FROM users WHERE phone = ?`,
    [phone]
  );

  if(queryRes) {
    const error = new Error("USER_EXIST")
    error.statusCode = 400
    throw error;
  }
  else {
  return queryRes;
  }
};


const createUser = async (email, hashedPw, name, phone ) => {
  return await myDataSource.query(`
  INSERT INTO users (email, password, name, phone) 
  VALUES (?, ?, ?, ?)`
  ,[email, hashedPw, name, phone])
}

module.exports = { getUserByEmail, getUserByPhone, createUser }