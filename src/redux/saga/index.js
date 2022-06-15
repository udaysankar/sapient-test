// Redux Fork Import
import { fork } from 'redux-saga/effects';

// Saga Import
import UserSaga from './UserSaga';


export default function* rootSaga() {
  yield* [
    fork(UserSaga),
  
  ];
}
