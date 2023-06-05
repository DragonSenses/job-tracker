import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  
  try{
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user = { userId: payload.userId };
    
    next();
  } catch(error){
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authenticate 