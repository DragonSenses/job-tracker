import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';

export default function SearchContainer() {
  const {
    isLoading,
    handleChange,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if(isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <Wrapper>
      <form action="" className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          >
          </FormRow>
        </div>
      </form>    
    </Wrapper>
  );
}
