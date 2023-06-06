import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import { useState, useMemo } from 'react';

export default function SearchContainer() {
  const [localSearch, setLocalSearch ] = useState('');

  const {
    isLoading,
    handleChange,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  }; 

  const optimizedDebounce = useMemo(() => {
    const debounce = () => {
      let timerId;
      return (e) => {
        setLocalSearch(e.target.value);
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          handleChange({ name: e.target.name, value: e.target.value });
        }, 1000);
      };
    }

    return debounce();
  }, [handleChange]);

  return (
    <Wrapper>
      <form action="" className="form">
        <h4>search jobs</h4>
        <div className="form-center">
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          >
          </FormRow>

          <FormRowSelect
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          >
          </FormRowSelect>

          <FormRowSelect
            labelText='job type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          >
          </FormRowSelect>

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={['all', ...sortOptions]}
          >
          </FormRowSelect>

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
