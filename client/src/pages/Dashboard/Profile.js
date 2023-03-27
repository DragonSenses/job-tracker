import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { FormRow, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashBoardFormPage.js';

export default function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !email || !lastName || !location){
        displayAlert();
        return;
      }

      updateUser({ name, email, lastName, location });
    }

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}

        <div className="form-center">

          <FormRow 
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow 
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setLastName(e.target.value)}
            labelText = 'last name'
          />
          <FormRow 
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow 
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

        </div>
      </form>
    </Wrapper>
  );
};
