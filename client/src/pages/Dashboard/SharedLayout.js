import React from 'react';
import { Outlet } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout';
import { LargeSidebar, Navbar, SmallSidebar } from '../../components';

export default function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <LargeSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">

            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
