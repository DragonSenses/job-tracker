import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';

export default function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading }=
    useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);
  
  return (
    <h1>Profile</h1>
  )
}
