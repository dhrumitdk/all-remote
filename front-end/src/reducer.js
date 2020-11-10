export const initialState = {
  accessCodeState: null,
};

const reducer = (state, action) => {
  //console.log(action);

  // action => type, [payload]
  switch (action.type) {
    case "SET_ACCESSCODE":
      return {
        accessCodeState: action.accessCodeState,
      };
    default:
      return state;
  }
};

export default reducer;
