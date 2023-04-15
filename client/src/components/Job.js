import React from 'react';
import moment from 'moment';

export default function Job({props}) {
  const { company, createdAt } = props;

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY'); // Apr 14th 23

  return (
    <div>
      Job
      <h5>{company}</h5>
      <h5>{date}</h5>
    </div>
  );
}
