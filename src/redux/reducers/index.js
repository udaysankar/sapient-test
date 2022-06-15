// Redux Import
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  User: UserReducer,
});

export const useAppSelector = useSelector;
export default rootReducer;
