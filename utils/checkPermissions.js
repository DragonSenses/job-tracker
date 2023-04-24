import { UnAuthenticatedError } from '../errors/index.js';

export default function checkPermissions(requestUser, resourceUserId) {
  // Check if user object is admin

  // Check if userId matches to that who created the resource
  if(requestUser.userId === resourceUserId.toString()) {
    return;
  }

  // Throw error in all other cases
  throw new UnAuthenticatedError("Not authorized to access this route");
};