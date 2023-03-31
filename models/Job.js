import mongoose from "mongoose";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const JobSchema = new Schema({
  company: {
    type: String,
    required: [true, 'Please provide company'],
    maxLength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status:{
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  jobType:{
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'internship'],
    default: 'full-time',
  },
  jobLocation:{
    type: String,
    default: 'my city',
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the User'],
  }, 
}, { timestamps: true } );

export default mongoose.model('Job', JobSchema);