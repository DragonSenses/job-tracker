import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnAuthenticatedError extends CustomAPIError {
  constructor(messsage){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError