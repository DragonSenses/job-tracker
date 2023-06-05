import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import { UnAuthenticatedError } from '../errors/index.js';
import xssFilters from 'xss-filters';
import attachCookie from '../utils/attachCookie.js';

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

  const user = await User.create({ name, email, password });

  const token = user.createToken();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name
    }, 
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
  attachCookie({ res, token });
  user.password = undefined;

  res.status( StatusCodes.OK ).json({ 
    user,
    location: user.location 
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location} = req.body;

  if(!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({_id: req.user.userId});

  // Sanitize the inputs before saving the updated info in the user
  user.email = xssFilters.inHTMLData(email);
  user.name = xssFilters.inHTMLData(name);
  user.lastName = xssFilters.inHTMLData(lastName);
  user.location = xssFilters.inHTMLData(location);

  await user.save();

  const token = user.createToken();
  attachCookie({ res, token });

  res.status( StatusCodes.OK ).json({ 
    user, 
    location: user.location 
  });
};

export { register, login, updateUser }