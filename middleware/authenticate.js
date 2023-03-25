import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(' ')[1];
  
  try{
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { userId: payload.userId };
    next();
  } catch(error){
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authenticate 