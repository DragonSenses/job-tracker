import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import connectDB from './db/connect.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.get('/', (req, res) => {
  res.send('Hello');
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => { 
      console.log(`Server is listening on port ${port}...`)
    });

  } catch(error){
    console.log(error);
  }
}

start();