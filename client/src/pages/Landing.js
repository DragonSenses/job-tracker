import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

function Landing() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <img src={logo} alt="job tracker logo" className="logo" />
          </li>
        </ul>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracking</span> App</h1>
          <h4>Track and manage all your job applications in one place.</h4>
        </div>
        <p>
           
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Fuga odit pariatur voluptatum quam quia facere delectus, ipsam deleniti officiis culpa. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis optio provident iusto tempore nam natus odio sit, ipsum dolorem pariatur!
        </p>
        <button className='btn btn-hero'>Login/Register</button>
      </div>
      <img src={main} alt="job hunt" className='img maing-img'></img>
    </main>
  );
}

export default Landing 