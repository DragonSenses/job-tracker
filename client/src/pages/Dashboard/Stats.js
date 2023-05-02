import React from 'react';
import { useAppContext } from '../../context/appContext';
import { Loading } from '../../components';

export default function Stats() {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext();


  if(isLoading){
    return <Loading center />;
  }

  return (
    <h1>Stats Page</h1>
  );
}
