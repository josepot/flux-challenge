import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import { getSith } from '../api'

const slotStatus = {EMPTY: 'EMPTY', FETCHING: 'FETCHING', FETCHED: 'FETCHED'};
const MAX_SLOTS = 5;
const SCROLL_SPACES = 2;
const ID_FIRSTH_SITH = 3616;

//Helpers
const getScrollSlots = (maxSlots, scrollSlots) => (maxSlots <= scrollSlots ? 1 : scrollSlots)
const getScrollSlotsIndex = (up, scrollSlots) => (up? scrollSlots - 1 : 0)
const getTableSlotsIndex = (up, maxSlosts) => (up? 0 :  maxSlosts-1 )   
const getScrolledNewIndex = (up, scrollSlots, maxSlots) => (up? scrollSlots-1 : maxSlots-scrollSlots) 

//Actions
export const ACTIONS = {
    SCROLL : 'SCROLL',
    USER_SCROLL : 'USER_SCROLL',
    UPDATE_LIST : 'UPDATE_LIST',
    FIRST_FETCH : 'FIRST_FETCH',
    UPDATE_ITEM: 'UPDATE_ITEM',
    UPDATE_INDEX: 'UPDATE_INDEX',
    FETCH_SITH: 'FETCH_SITH'

};

//Action creators
export const firstSith = {type: ACTIONS.FIRST_FETCH};
export const scrollUp = {type: ACTIONS.USER_SCROLL, up: true}
export const scrollDown = {type: ACTIONS.USER_SCROLL, up: false}

//reducers
const initialState = {
  infoTable: {}, //Every Item will be of the form {id: info}
  indexTable: Array(5).fill(-1) //Every item will be the id of the current sloth's sith 
}

const updateIndex = (state, action) => {
  let indexTable = [...state.indexTable];
  indexTable[action.index] = action.id
  return {indexTable: indexTable}
}

const updateItem = (state, action) => {
  let infoTable = {...state.infoTable};
  infoTable[action.id] = Object.assign({}, state.infoTable[action.id], action);
  delete infoTable[action.id].type
  return {infoTable: infoTable}
}

const scrollState = (state, action) => {

  const newState = {...state};
  const scrollSlots = getScrollSlots(MAX_SLOTS, SCROLL_SPACES);
  const indexSlot = getScrollSlotsIndex(action.up, scrollSlots);
  const indexTable = getTableSlotsIndex(action.up, MAX_SLOTS)

  const borderSith = newState.infoTable[newState.indexTable[indexTable]];
  const id = action.up ? borderSith.info.master.id:borderSith.info.apprentice.id
  const newSlots = Array(scrollSlots).fill(-1)
  newSlots[indexSlot] = id
  newState.indexTable = action.up ?  [...newSlots, ...newState.indexTable.slice(0,(MAX_SLOTS - scrollSlots))] : [...newState.indexTable.slice(scrollSlots,MAX_SLOTS), ...newSlots] ; 
  newState.infoTable[id] = {status: slotStatus.EMPTY}   
  console.log(state.indexTable);
  console.log(newState.indexTable)
  return newState
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
      //Update ordered table
      case ACTIONS.UPDATE_INDEX:
        return Object.assign({},state, updateIndex(state,action));
      case ACTIONS.UPDATE_ITEM:
        return Object.assign({},state, updateItem(state,action));
      case ACTIONS.SCROLL:
        return Object.assign({},state, scrollState(state,action));
      default:
        return state
    }
  }
  

//sagas 
export function *getItem({id, index, status}){

  const state = yield select(state => state.siths); 

  //If the item is already fetched don't do anything
  if(!id || !state.infoTable[id] || !state.infoTable[id].info){
    yield put({type: ACTIONS.UPDATE_INDEX, id: id, index: index});
    yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: status});
    let newSith = yield getSith(id).then((response) =>  response.json());
    yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.FETCHED, info: newSith});

    if(index > 0 && newSith.master.id )
      yield put({type: ACTIONS.FETCH_SITH, id: newSith.master.id, status: slotStatus.EMPTY, index: index-1});

    if(index < MAX_SLOTS - 1 && newSith.apprentice.id)
      yield put({type: ACTIONS.FETCH_SITH, id: newSith.apprentice.id, status: slotStatus.EMPTY, index: index+1});
  }

}

export function *getFirstSith(){
  yield call(getItem, {id: ID_FIRSTH_SITH, index: Math.floor(MAX_SLOTS/2), status: slotStatus.EMPTY});
}

export function *getNextSith(action){
  yield call(getItem, {id: action.id, index: action.index, status: slotStatus.EMPTY});
}

export function *scroll(action){
  yield put({type: ACTIONS.SCROLL, up: action.up });
  const state = yield select(state => state.siths);
  const index = getScrolledNewIndex(action.up, SCROLL_SPACES, MAX_SLOTS);
  yield call(getItem, {id: state.indexTable[index], index: index, status: slotStatus.EMPTY});
}


export default function *rootSaga() {
    yield all([
      yield takeEvery(ACTIONS.FETCH_SITH, getNextSith),
      yield takeLatest(ACTIONS.FIRST_FETCH, getFirstSith),
      yield takeLatest(ACTIONS.USER_SCROLL, scroll),
    ])
}