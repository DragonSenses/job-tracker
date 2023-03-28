import React from 'react';
import { useReducer, useContext } from 'react';
import axios from 'axios';
import reducer from './reducer';
import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null ,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
}

const AppContext = React.createContext();

export default function AppProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios custom instance
  const authFetch = axios.create({
    baseURL: '/api/v1',

  });

  // Axios request interceptor
  authFetch.interceptors.request.use( 
    function (config) {
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
    }
  );

  // Axios response interceptor
  authFetch.interceptors.response.use( 
    function (response) {
      return response;
    }, 
    function (error) {
      console.log(error);
      console.log(error.response);

      if(error.response.status === 401){
        console.log('Auth Error');
      }

      return Promise.reject(error);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 7000)
  };

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT
    });
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };
  
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try{
      const response = await axios.post('/api/v1/auth/register', currentUser);
      // console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch(error){
      // console.log(error.response);
      dispatch( {
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try{
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      
      addUserToLocalStorage({ user, token, location });
    } catch(error){
      dispatch( {
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    console.log(currentUser);
    try{
      const { data } = await authFetch.patch('/auth/updateUser', JSON.stringify(currentUser));
      console.log(data);
    } catch(error) {
      console.log(error.response);
    }
  };

  return (
    <AppContext.Provider value = {{...state, 
    displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, useAppContext }