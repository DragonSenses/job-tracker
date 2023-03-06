import React, { useState } from 'react'
import Logo from '../components/Logo.js'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
  name: '',
  email:'',
  password:'',
  isMember: false,
}

export default function Register() {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => { 
    console.log(e.target) 
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <h1>Register</h1>
  )
}
