import express from 'express';
const router = express.Router();

import { register, login, updateUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/authenticate.js';

import rateLimiter from 'express-rate-limit';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router
