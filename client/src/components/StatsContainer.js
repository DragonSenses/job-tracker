import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';

export default function StatsContainer() {
  const { stats } = useAppContext();

  const defaultStats = [];

  return (
    <Wrapper>StatsContainer</Wrapper>
  );
}
