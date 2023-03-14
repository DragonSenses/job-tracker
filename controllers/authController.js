import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js'


const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // next(new Error());  // If not using http-status-codes
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await User.findOne({email});

  if(userAlreadyExists){
    throw new BadRequestError(`The email: ${email} is already in use.`);
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