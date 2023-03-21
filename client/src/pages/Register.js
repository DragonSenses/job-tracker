import React, { useState } from 'react';
import { Alert, FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if( !email || !password || (!isMember && !name)){
      displayAlert();
      return; 
    }

    const currentUser = { name, email, password };

    if(isMember){
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    console.log(values);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  };

  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit} action="">
        <Logo />
        <h3>{values.isMember ? "Log In" : "Register"}</h3>
        {showAlert && <Alert />}

        { !values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

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

        <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type='button'
            onClick={toggleMember}
            className="member-btn">
            { values.isMember ? 'Register' : 'Log In' }
          </button>
        </p>

      </form>
    </Wrapper>
  )
}
