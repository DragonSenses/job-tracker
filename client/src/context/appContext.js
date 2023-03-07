import React from 'react';
import { useState, useReducer, useContext } from 'react'

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}

const AppContext = React.createContext();

export default function AppProvider(props) {
  const { children } = props;
  const [state, setState] = useState(initialState);


  return (
    <AppContext.Provider value = {{...state}}>
      {children}
    </AppContext.Provider>
  )
}

export { initialState }