import mongoose from "mongoose";
const { Schema } = mongoose;

import validator from 'validator';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email!'
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default:'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 30,
    default:'my location',
  },
});

UserSchema.pre('save', function(){
  console.log(this.password);
});

export default mongoose.model('User', UserSchema);