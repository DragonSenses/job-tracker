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

  return (
    <Wrapper>
      <form action="" className="form">
        <h4>search form</h4>
        <div className="form-center">
            <FormRow>

            </FormRow>
        </div>
      </form>    
    </Wrapper>
  );
}
