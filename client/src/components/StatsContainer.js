import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

export default function StatsContainer() {
  const { stats } = useAppContext();

  const defaultStats = [];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })};
    </Wrapper>
  );
}
