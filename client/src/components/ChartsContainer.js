import React, {useState} from 'react';

import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

export default function ChartsContainer() {
  const { monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={}>

      </button>
    </Wrapper>
  );
}
