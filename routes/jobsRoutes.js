import express from 'express';
const router = express.Router();

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js'

// router.route('/').post(createJob).get(getAllJobs);
// router.route('/stats').get(showStats);
// router.route('/:id').delete(deleteJob).patch(updateJob);

// Demo User Testing
import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob);

export default router