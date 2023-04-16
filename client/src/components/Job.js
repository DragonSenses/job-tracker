import React from 'react';
import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';

export default function Job({props}) {
  const {
    _id,
    position, 
    company, 
    jobLocation, 
    jobType, 
    createdAt, 
    status
  } = props;

  

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY'); // Apr 14th 23

  return (
    <Wrapper>
      Job
      <h5>{company}</h5>
      <h5>{date}</h5>
    </Wrapper>
  );
}
