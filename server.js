import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

// express-async-errors 
import 'express-async-errors';

import morgan from 'morgan';

// Database and Authentication
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/authenticate.js';

// Deployment
import path from 'path';
import { dirname } from 'path';
import { fileURLtoPath } from 'url';

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.send('Hello');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

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
};

start();