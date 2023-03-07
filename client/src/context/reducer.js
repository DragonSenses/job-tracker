
const reducer = (state, action) => {
  throw new Error(`No such action: ${action.type}`);
}

export default reducer