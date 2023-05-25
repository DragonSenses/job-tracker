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

  const pages = Array.from( 
    { length: numOfPages },
    (index) => {
      return index++;
    }
  );

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button>
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
