import React from 'react';

export default function Job({props}) {
  const { company } = props;

  return (
    <div>
      Job
      <h5>{company}</h5>
    </div>
  );
}
