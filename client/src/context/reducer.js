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
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
} from "./actions";

import { initialState } from './appContext.js';

function reducer(state, action) {

  switch (action.type) {
    case DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      };
    }

    case CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    }

    case REGISTER_USER_BEGIN: {
      return {
        ...state,
        isLoading: true
      };
    }

    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: 'Register Successful! Redirecting...'
      };
    }

    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    case LOGIN_USER_BEGIN: {
      return {
        ...state,
        isLoading: true
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: 'Login Successful! Redirecting...'
      };
    }

    case LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }

    case LOGOUT_USER: {
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: '',
        jobLocation: '',
      };
    }

    case UPDATE_USER_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Updated!'
      };
    }

    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    case HANDLE_CHANGE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }

    case CLEAR_VALUES: {
      const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending',
      };

      return {
        ...state,
        ...initialState
      };
    }

    case CREATE_JOB_BEGIN: {
      return{
        ...state,
        isLoading: true
      };
    }

    case CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Job Created!'
      };
    }

    case CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    case GET_JOBS_BEGIN: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }

    case GET_JOBS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    }

    case SET_EDIT_JOB: {
      const job = state.jobs.find( (job) => job._id === action.payload.id);
      const {
        _id, position, company, jobLocation, jobType, status
      } = job;

      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    }

    case DELETE_JOB_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EDIT_JOB_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job Updated!',
      };
    }

    case EDIT_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    default: {
      throw new Error(`No such action: ${action.type}`);
    }
  }
}

export default reducer