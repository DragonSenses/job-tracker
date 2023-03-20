import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
  if(action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  } else if(action.type === CLEAR_ALERT){
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  } else if(action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  } else if(action.type === REGISTER_USER_SUCCESS){
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
  } else if(action.type === REGISTER_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  throw new Error(`No such action: ${action.type}`);
}

export default reducer