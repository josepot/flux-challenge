import { combineReducers } from "redux";
import { reducers as planet } from '../modules/header'
import { reducers as siths } from '../modules/items'

export const reducers = combineReducers({
  planet,
  siths
});
  