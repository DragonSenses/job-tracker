import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout';

export default function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to='add-job'>add job</Link>
        <Link to='all-jobs'>all job</Link>
      </nav>
      <Outlet />
    </Wrapper>
  )
}
