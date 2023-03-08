const notFoundMiddleware = (req, res) => 
  res.status(404).send('404! Oops, Route does not exist'); 

export default notFoundMiddleware