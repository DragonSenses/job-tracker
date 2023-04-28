import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

async function populate(){
  try{
    console.log("======== Populate() ========");
    await connectDB(process.env.MONGO_URL);
    
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );

  } catch(error){
    console.log(`Error occured in populate: ${error}`);
    console.log(error.message);
    process.exit(1);
  }
}

populate();