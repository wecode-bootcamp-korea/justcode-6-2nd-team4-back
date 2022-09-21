const userService = require('../services/user_service');


const signUpController = async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!(email && password && name && phone)) {
    res.status(400).json({ error: 'INPUT_ERROR' });
    return;
  }

  try {
    await userService.signUpService(email, password, name, phone );
    res.status(201).json({ message: 'USER_CREATED' });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const logInController = async (req, res) => {
  const { id, pw } = req.body;

  if(!(id && pw)) {
    res.status(400).json({ error: "INPUT_ERROR"})
    return;
  }

  try{
    const resData = await userService.logInService(id, pw)
    res.status(201).json( resData )
  } catch (error) {
    console.log(error);
    res.status( error.statusCode || 500 ).json({ error: error.message })    
  }
}


module.exports = { signUpController, logInController }