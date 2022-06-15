/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import * as TActionType from './../actionType/UserActionType';
import * as UAPI from './../api/UserApi';

function* getUserByEmailCase(action) {
  try {
    const response = yield call(UAPI.getUserByEmail, action);
    console.log(response)
    const { data , status } = JSON.parse(response);
    console.log(data)
    if (status === false) {
      yield put({
        type: TActionType.FETCH_ALL_USERS_FAILURE,
        error: status,
      });
    } else {
      yield put({
        type: TActionType.FETCH_ALL_USERS_SUCCESS,
        data: data,
      });
    }
  } catch (error) {
    yield put({
      type: TActionType.FETCH_ALL_USERS_FAILURE,
      error,
    });
  }
}


function* updatePrimaryColorCase(action) {
    try {
      const response = yield call(UAPI.updatePrimaryColor, action);
      console.log(response)
      const { data , status } = JSON.parse(response);
      console.log(data)
      if (status === false) {
        yield put({
          type: TActionType.UPDATE_PRIMARY_COLOR_FAILURE,
          error: status,
        });
      } else {
        yield put({
          type: TActionType.UPDATE_PRIMARY_COLOR_SUCCESS,
          data: data,
        });
      }
    } catch (error) {
      yield put({
        type: TActionType.UPDATE_PRIMARY_COLOR_FAILURE,
        error,
      });
    }
  }

function* UserSaga() {
  yield all([
    takeLatest(TActionType.FETCH_ALL_USERS, getUserByEmailCase),
    takeLatest(TActionType.UPDATE_PRIMARY_COLOR, updatePrimaryColorCase),
   
  ]);
}

export default UserSaga;
