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
    // console.log("-------- Authenticate Middleware --------");
    // console.log(`[token]: 
    //   ${token}`);
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(`[payload]: \t ${payload}`);
    // console.log(`[userId]: \t ${payload.userId}`);
    req.user = { userId: payload.userId };
    // console.log("----- End of Authenticate Middleware -----");
    next();
  } catch(error){
    console.log(`Error in Authenticate Middleware: 
      ${error}`);
    console.log("verification went wrong");
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authenticate 