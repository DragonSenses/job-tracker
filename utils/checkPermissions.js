import { UnAuthorizedError } from '../errors/index.js';

export default function checkPermissions(requestUser, resourceUserId) {
  // Check if user object is admin

  if(requestUser.userId === resourceUserId.toString()) {
    return;
  }

  throw new CustomError.UnAuthorizedError("Not authorized to access this route");
};