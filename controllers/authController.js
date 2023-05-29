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

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name
    }, 
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Get the user in db whose email matches with the one from request
  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if(!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createToken();
  user.password = undefined;
  res.status( StatusCodes.OK ).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location} = req.body;

  if(!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({_id: req.user.userId});

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createToken();

  res.status( StatusCodes.OK ).json({ user, token, location: user.location });
};

export { register, login, updateUser }