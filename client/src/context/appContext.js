import React from 'react';
import { useReducer, useContext } from 'react'
import reducer from './reducer';
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}

const AppContext = React.createContext();

export default function AppProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 3000)
  }

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT
    });
    clearAlert();
  }

  return (
    <AppContext.Provider value = {{...state, displayAlert}}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, useAppContext }