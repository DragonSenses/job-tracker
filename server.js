import notFoundMiddleware from './middleware/not-found.js'

import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello');
})

app.use(notFoundMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));