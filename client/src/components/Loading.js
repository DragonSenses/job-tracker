import React from 'react';

export default function Loading(props) {
  const { center } = props;

  return (
    <div className={center ? 'loading loading-center': 'loading'}></div>
  );
}
