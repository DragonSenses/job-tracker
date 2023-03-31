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

    default: {
      throw new Error(`No such action: ${action.type}`);
    }
  }
}

export default reducer