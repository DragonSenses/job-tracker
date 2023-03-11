import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

export default function Error() {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="404 not found"/>
        <h3>page not found</h3>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  )
}
