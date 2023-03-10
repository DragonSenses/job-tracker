const createJob = async (req, res) => {
  res.send('createJob');
}

const getAllJobs = async (req, res) => {
  res.send('getAllJobs');
}

const updateJob = async (req, res) => {
  res.send('updateJob');
}

const deleteJob = async (req, res) => {
  res.send('deleteJob');
}
const showStats = async (req, res) => {
  res.send('showStats');
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
