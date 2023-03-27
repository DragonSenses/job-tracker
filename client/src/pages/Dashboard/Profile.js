import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { FormRow, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashBoardFormPage.js';

export default function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading }=
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
      <h1>profile</h1>
      <form action="" className="form" onSubmit={handleSubmit}>

      </form>
    </Wrapper>
  )
}
