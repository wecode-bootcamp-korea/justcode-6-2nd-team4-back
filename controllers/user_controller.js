const userService = require('../services/user_service');

const logInController = async (req, res) => {
  const { id, pw } = req.body;

  if(!(id && pw)) {
    res.status(400).json({ error: "INPUT_ERROR"})
    return;
  }

  try{
    const resData = await userService.logInService(id, pw)
    res.status(201).json({ message: "LOGIN_SUCCESS", data: resData })
  } catch (error) {
    console.log(error);
    res.status( error.statusCode || 500 ).json({ error: error.message })    
  }
}


module.exports = { logInController };
