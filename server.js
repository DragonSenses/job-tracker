import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

// Database and AuthenticateUser
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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