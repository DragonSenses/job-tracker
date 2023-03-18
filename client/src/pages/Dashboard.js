import React from 'react';
import { useEffect } from 'react';

export default function Dashboard() {
  const fetchData = async () => {
    try{
      const response = await fetch('http://localhost:4000');
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log(error);
    }
  }

  useEffect( () => {
    fetchData();
  },[]);

  return (
    <h1>Dashboard</h1>
  )
}
