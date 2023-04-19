import React from 'react';
import { useReducer, useContext, useEffect } from 'react';
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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
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
  showSidebar: false,
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
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
      config.headers['Authorization'] = `Bearer ${state.token}`;
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
      console.log(`Error triggered in authFetch, Axios Response Interceptor
      error: ${error}
      error.response: ${error.response}`);

      if(error.response.status === 401){
        console.log('Authentication Error');
        logoutUser();
      }

      return Promise.reject(error);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 4000)
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

    dispatch({ type: UPDATE_USER_BEGIN });

    try{
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      
      console.log(data);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });

    } catch(error) {
      if(error.response.status !== 401){
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try{
      const { 
        position, 
        company, 
        jobLocation, 
        jobType, 
        status 
      } = state;

      await authFetch.post('/jobs', {
        position, 
        company, 
        jobLocation, 
        jobType, 
        status 
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });

    } catch(error){
      if(error.response === 401) {
        return;
      }

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  
  const getJobs = async () => {
    let url = `/jobs`;
    
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const data = await authFetch(url);
      
      console.log(`Data from authFetch: 
        ${data}`);

      console.log("-------- Printing out values of data --------")
      // let i = 0;
      // for (let value of Object.values(data)){
      //   console.log(`value ${i++} is`);
      //   console.log(value);
      // }

      for (let entry of Object.entries(data)){
        console.log(entry);
      }
      console.log("--------End of data --------")

      const { jobs, totalJobs, numOfPages } = data.data;

      console.log(`
      jobs: \t\t ${jobs}
      totalJobs: \t ${totalJobs}
      numOfPages: \t ${numOfPages}`
      );

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });

    } catch(error){
      console.log(`Error triggered in getJobs() appContext.js! 
      Here is the Error Response:
      ${error.response}`);
      // logoutUser();
    }
    clearAlert();
  };

  // useEffect( () => {
  //   getJobs();
  // }, []);

  const setEditJob = (id) => {
    console.log(`set edit job: ${id}`);

    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = () => {
    console.log('edit job');
  }

  const deleteJob = (id) => {
    console.log(`delete job : ${id}`);
  };

  return (
    <AppContext.Provider value = {{...state, 
    displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange,
    clearValues, createJob, getJobs, setEditJob, deleteJob, editJob, }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, useAppContext }