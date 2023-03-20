import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthenticatedError extends CustomAPIError {
  constructor(messsage){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError