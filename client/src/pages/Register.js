import React, { useState } from 'react'
import Logo from '../components/Logo.js'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
  name: '',
  email:'',
  password:'',
  isMember: true,
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
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit} action="">
        <Logo />
        <h3>Log In</h3>

        <button type="submit" className="btn btn-block">submit</button>
      </form>
    </Wrapper>
  )
}
