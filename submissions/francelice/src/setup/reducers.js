import { combineReducers } from "redux";
import currentPlanet from '../modules/currentPlanet'
import siths from '../modules/siths'

export const reducers = combineReducers({
  currentPlanet,
  siths
});
