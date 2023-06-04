import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

async function populate(){
  try{
    console.log("======== Populate() ========");
    await connectDB(process.env.MONGO_URL);
    console.log("---- Finished connecting to database ---- ");
    console.log("---- Start to Read and Parse the json file ---- ");
    const jsonProducts = JSON.parse(
      await readFile(new URL('./MOCK_DATA.json', import.meta.url))
    );
    console.log("---- Read and parsed the data from MOCK_DATA.json ---- ");
    console.log(`The value of "jsonProducts" is: ${jsonProducts}`);
    await Job.create(jsonProducts);
    console.log("---- Job Created Successfully! ----");
  } catch(error){
    console.log(`Error occured in populate: ${error}`);
    console.log(error.message);
    process.exit(1);
  }
}

populate();