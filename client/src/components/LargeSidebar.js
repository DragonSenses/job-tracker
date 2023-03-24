import React from 'react';
import Wrapper from '../assets/wrappers/LargeSidebar.js';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from './NavLinks.js';

export default function LargeSidebar() {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div 
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />   
        </div>
      </div>
    </Wrapper>
  );
};
