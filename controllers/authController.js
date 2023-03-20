import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import { UnAuthenticatedError } from '../errors/index.js';

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
  const token = user.createToken();
  res.status(StatusCodes.CREATED).json({user:{
    email: user.email,
    lastName: user.lastName,
    location: user.location,
    name: user.name
  }, token});
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Get the user in db whose email matches with the one from request
  const user = await User.findOne({ email });

  if(!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  console.log(user);
  
  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if(!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  // Match email to password
  res.send('login user');
}

const updateUser = (req, res) => {
  res.send('updateUser');
}

export { register, login, updateUser }