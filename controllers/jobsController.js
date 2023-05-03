import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';

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

  checkPermissions(req.user, job.createdBy);

  // Find and update the job, run validation & return a new document
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId}, req.body, {
    new: true,
    runValidators: true,
  });

  // Send a 200 Response with a json of the newly updated job
  res.status(StatusCodes.OK).json( { updatedJob });
};

const deleteJob = async (req, res) => {
  // Extract job id from the request
  const { id: jobId } = req.params;

  // Access the corresponding job document through our Job model with findOne()
  const job = await Job.findOne({ _id: jobId });

  // Check if we found the job
  if(!job){
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // Check if user has permissions
  checkPermissions(req.user, job.createdBy);

  // Remove the job document from the model
  await job.deleteOne();

  // Respond with OK status and a msg to indicate to front-end that job is deleted
  res.status(StatusCodes.OK).json({ msg: 'Job removed successfully.' });
};

const showStats = async (req, res) => {
  console.log("======== Starting Show Stats | Backend ========");

  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  console.log(`Finished Job.aggregate(), logging stats:
  type of stats: ${typeof stats}
  stats: ${stats}`);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(`Finished reduce(), logging stats:
  type of stats: ${typeof stats}
  stats: ${stats}`);

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {$match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
    {$group: {
      _id: {
        year: { },
        month: { },
      },
      count: { $sum: 1 },
      },
    },
    {$sort: { '_id.year': -1, '_id.month': -1 }},
    {$limit: 6 },
  ]);
  
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
