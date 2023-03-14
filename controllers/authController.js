import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // next(error);
    throw new Error("Please provide all values");
  }

  // Instead of req.body, pass in the input fields
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({user});
}

const login = (req, res) => {
  res.send('login user');
} 

const updateUser = (req, res) => {
  res.send('updateUser');
}

export { register, login, updateUser }