import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';


export default function PageBtnContainer() {

  const { 
    page,
    numOfPages,
    changePage,
  } = useAppContext();

  const prevPage = () => {
    let prevPage = page - 1;

    if (prevPage < 1) {
      prevPage = numOfPages;
    }

    changePage(prevPage);
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
            <button
              type='button'
              className={(pageNumber === page) ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
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
