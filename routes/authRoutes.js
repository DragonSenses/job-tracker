import express from 'express';
const router = express.Router();

import { 
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from '../controllers/authController.js';

import authenticateUser from '../middleware/authenticate.js';

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message:
		'Too many accounts created from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.get('/logout', logout);

router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router
