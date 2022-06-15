import * as TActionType from "./../actionType/UserActionType";

const initialState = {
  user: undefined,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case TActionType.FETCH_ALL_USERS:
      return { ...state };
    case TActionType.FETCH_ALL_USERS_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        user: action && action.data.getUserByEmail,
      };
    case TActionType.FETCH_ALL_USERS_FAILURE:
      console.log(state);
      return { ...state };
    case TActionType.UPDATE_PRIMARY_COLOR:
      return { ...state, isloading: true };
    case TActionType.UPDATE_PRIMARY_COLOR_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        user: action && action.data.changeColor,
      };
    case TActionType.UPDATE_PRIMARY_COLOR_FAILURE:
      console.log(state);
      return { ...state };
    default:
      return { ...state };
  }
};

export default UserReducer;
