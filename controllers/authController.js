import User from '../models/User.js';

const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user});
  } catch(error){
    next(error);
  }
  
  res.send('register user');
}

const login = (req, res) => {
  res.send('login user');
} 

const updateUser = (req, res) => {
  res.send('updateUser');
}

export { register, login, updateUser }