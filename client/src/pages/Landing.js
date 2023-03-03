import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage';

function Landing() {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="job tracker logo" className="logo" />
      </nav>
      <div className="container page">

        <div className="info">
          <h1>Job <span>Tracking</span> App</h1>
          <h4>Track and manage all your job applications in one place.</h4>
          <p>
            Are you also feeling lost as a job seeker? I created this app to ease 
            the process of applying. To give you that organization and certainty fraught
            with a time where there is little to none. Keep sending out applications.
            I know it is discouraging, but you have to bump the number of applications up.
            You are not alone in this struggle, I'm also in the same process.
            I hope this app will prevent you from growing too despondent. <strong>"If I can ease one
            life the aching, I shall not live in vain" - Emily Dickinson</strong>
          </p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>

        <img src={main} alt="job hunt" className='img main-img'></img>

      </div>
    </Wrapper>
  );
}

export default Landing 