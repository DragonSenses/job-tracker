import { UnAuthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
  const headers = req.headers;
  const authHeader = req.headers.authorization;
  console.log(headers);
  console.log(authHeader);
  if(!authHeader){
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  next();
};

export default authenticate 