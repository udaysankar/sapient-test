/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TActionType from "../actionType/UserActionType";

export const getUserByEmail = (payload) => ({
  type: TActionType.FETCH_ALL_USERS,
  payload,
});

export const updatePrimaryColor = (payload) => ({
  type: TActionType.UPDATE_PRIMARY_COLOR,
  payload,
});
export const getUsersSuccess = (payload) => ({
  type: TActionType.FETCH_ALL_USERS_SUCCESS,
  payload,
});
export const getUsersFailure = (payload) => ({
  type: TActionType.FETCH_ALL_USERS_FAILURE,
  payload,
});

export default {
  getUserByEmail,
  updatePrimaryColor,
};
