import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: '500 - Something went wrong, try again later',
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err});
}

export default errorHandlerMiddleware