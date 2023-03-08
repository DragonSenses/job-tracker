import { DISPLAY_ALERT } from "./actions";

const reducer = (state, action) => {
  if(action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  throw new Error(`No such action: ${action.type}`);
}

export default reducer