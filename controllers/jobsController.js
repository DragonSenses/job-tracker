import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createJob = async (req, res) => {
  // Extract values from the request body
  const { position, company } = req.body;

  // Check if any of the values are empty
  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  // Set the createdBy property to that of the user in the request
  req.body.createdBy = req.user.userId;

  // Create the job in the database
  const job = await Job.create(req.body);

  // Respond with 201, and a json of the job
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  // Find the jobs created the user from the request
  const jobs = await Job.find({ createdBy: req.user.userId });

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

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
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // Find and update the job, run validation & return a new document
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId}, req.body, {
    new: true,
    runValidators: true,
  });

  // Send a 200 Response with a json of the newly updated job
  res.status(StatusCodes.OK).json( { updatedJob });
};

const deleteJob = async (req, res) => {
  res.send('deleteJob');
};

const showStats = async (req, res) => {
  res.send('showStats');
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
