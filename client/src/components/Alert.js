import React from 'react';
import { useAppContext } from '../context/appContext';

export default function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`alert alert-${alertType}`}>
      {alertText}
    </div>
  )
}
