import React from 'react';
import Wrapper from '../assets/wrappers/Navbar.js';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext.js';
import Logo from './Logo';

export default function Navbar() {
  const { toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={ toggleSidebar }>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={() => console.log('toggle dropdown')}>
            <FaUserCircle />
            User's Name
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => console.log('log out user')}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
