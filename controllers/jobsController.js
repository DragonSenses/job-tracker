import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
}

const updateJob = async (req, res) => {
  // Extract job ID from the request
  const { id: jobId } = req.params;

  // Extract company and position from the request's body
  const { company, position } = req.body;

  // Check if any of these values are empty
  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values');
  }

  // Find the job in the database
  const job = await Job.findOne({ _id: jobId });

  // If job is not found
  if (!job) {
    // Throw error
  }


  // The newly updated job
  let updatedJob;

  res.status(StatusCodes.OK).json( { updatedJob });
}

const deleteJob = async (req, res) => {
  res.send('deleteJob');
}
const showStats = async (req, res) => {
  res.send('showStats');
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
