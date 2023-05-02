import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { ChartsContainer, Loading, StatsContainer } from '../../components';

export default function Stats() {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if(isLoading){
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      { monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}
