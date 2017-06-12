import { combineReducers } from 'redux';
import { rtusReducer as upload } from '../main';

export const rootReducer = combineReducers({
    upload
});