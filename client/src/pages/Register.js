import React, { useState } from 'react'
import { Alert, FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: true,
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
        { values.showAlert && <Alert />}
        
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block">submit</button>
      </form>
    </Wrapper>
  )
}
