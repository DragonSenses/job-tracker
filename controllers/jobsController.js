import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';
import xssFilters from 'xss-filters';

const createJob = async (req, res) => {
  // 1. Extract values from the request body
  const { position, company } = req.body;

  // 2. Check if any of the values are empty
  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  // 3. Sanitize user inputs and save it to the request body
  req.body.company = xssFilters.inHTMLData(company);
  req.body.position = xssFilters.inHTMLData(position);

  // 4. Set the createdBy property for req.body to that of the user
  req.body.createdBy = req.user.userId;

  // 5. Create the job in the database
  const job = await Job.create(req.body);

  // 6. Respond with 201, and a json of the job
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  // Destructure the necessary variables from request's query
  const { search, status, jobType, sort } = req.query;

  // Create queryObject that keeps track of the user
  const queryObject = { 
    createdBy: req.user.userId,
  };

  // Set the status of the query if not `all`
  if (status !== 'all'){
    queryObject.status = status;
  }

  // Set the jobType of the query if not 'all'
  if (jobType !== 'all'){
    queryObject.jobType = jobType;
  }

  // Add position property to queryObject if search is non-empty
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  // Find the jobs created by the user from the request (WITHOUT await)
  let result = Job.find(queryObject);
  
  // Chain sort conditions to filter results
  if(sort === 'latest') {
    result = result.sort('-createdAt');
  }
  
  if(sort === 'oldest') {
    result = result.sort('createdAt');
  }
  
  if(sort === 'a-z') {
    result = result.sort('position');
  }
  
  if(sort === 'z-a') {
    result = result.sort('-position');
  }

  // Pagination Variables
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Chain operations to modify the query based on the page variables
  result = result.skip(skip).limit(limit);  

  // Await filtered jobs by sort conditions & processed through pagination
  const jobs = await result;

  // Calculate the variables needed to send back as a response
  const totalJobs = await Job.countDocuments(queryObject);

  // Number of pages should accomodate the remainder with an extra page
  const numOfPages = Math.ceil(totalJobs/limit);

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs, numOfPages });
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
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {$match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }},
    {$group: {
      _id: {
        year: { 
          $year: '$createdAt' 
        },
        month: { 
          $month: '$createdAt' 
        },
      },
      count: { $sum: 1 },
      },
    },
    {$sort: { '_id.year': -1, '_id.month': -1 }},
    {$limit: 6 },
  ]);
  
  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM YYYY');

    return { date, count };
  }).reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
