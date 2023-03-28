import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){
    console.log("authHeader is wrong");
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(' ')[1];
  
  try{
    console.log(`token is ${token}`);
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(`payload is: ${payload}`);
    console.log(`userId is: ${payload.userId}`);
    req.user = { userId: payload.userId };
    next();
  } catch(error){
    console.log(error);
    console.log("verification went wrong");
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authenticate 