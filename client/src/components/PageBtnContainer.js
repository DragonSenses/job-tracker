import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';


export default function PageBtnContainer() {

  const { page, numOfPages } = useAppContext();

  const prevPage = () => {
    console.log('previous page');
  };
  
  const nextPage = () => {
    console.log('next page');
  };

  return (
    <div>PageBtnContainer</div>
  );
};
