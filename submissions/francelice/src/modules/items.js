import { put, takeEvery, takeLatest, all, call, select, fork, take, cancel, spawn, race } from 'redux-saga/effects'
import { getSith } from '../api'

const slotStatus = {EMPTY: 'EMPTY', FETCHING: 'FETCHING', FETCHED: 'FETCHED'};
const MAX_SLOTS = 5;
const SCROLL_SPACES = 2;
const ID_FIRSTH_SITH = 3616;

//Helpers
const getScrollSlots = (maxSlots, scrollSlots) => (maxSlots <= scrollSlots && scrollSlots<=1 ? 1 : scrollSlots)

//Actions
export const ACTIONS = {
    SCROLL : 'SCROLL',
    USER_SCROLL : 'USER_SCROLL',
    UPDATE_LIST : 'UPDATE_LIST',
    FIRST_FETCH : 'FIRST_FETCH',
    UPDATE_ITEM: 'UPDATE_ITEM',
    UPDATE_INDEX: 'UPDATE_INDEX',
    FETCH_SITH: 'FETCH_SITH',
    CANCEL_FETCH: 'CANCEL_FETCH',
    SUCESS_FETCH: 'SUCESS_FETCH'


};

//Action creators
export const firstSith = {type: ACTIONS.FIRST_FETCH};
export const scrollUp = {type: ACTIONS.USER_SCROLL, up: true}
export const scrollDown = {type: ACTIONS.USER_SCROLL, up: false}

//reducer's helpers
const initialState = {
  infoTable: {}, //Every Item will be of the form {id: info, status: slotStatus}
  indexTable: Array(5).fill(-1), //Every item will be the id of the current sloth's sith 
  
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

const scrollState = (state, {up, max_slots, scroll_spaces}) => {

  const newState = {...state};
  const scrollSlots = getScrollSlots(max_slots, scroll_spaces);
  const newSlots = Array(scrollSlots).fill(-1)
  newState.indexTable = up ?  [...newSlots, ...newState.indexTable.slice(0,(max_slots - scrollSlots))] : [...newState.indexTable.slice(scrollSlots,max_slots), ...newSlots] ; 
  
  //Clean rows outside the view range
  Object.keys(newState.infoTable).map(item => parseInt(item)).forEach(element => {
    if(newState.indexTable.indexOf(element) === -1)
      delete newState.infoTable[element];
  });
  
  return newState
}


//REDUCERS
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
export function *fixTable(){

  const state = yield select(state => state.siths); 
  const lastApprentice = state.indexTable.filter(item => state.infoTable[item] && state.infoTable[item].info && state.infoTable[item].info.apprentice.id === null);

  if(lastApprentice[0]){
    const gap = (MAX_SLOTS-1) - state.indexTable.indexOf(lastApprentice[0]);
    if(gap)
      yield put({type: ACTIONS.USER_SCROLL, up: true, max_slots: MAX_SLOTS, scroll_spaces: gap});

  }else{
    const state = yield select(state => state.siths); 
    const firstMaster = state.indexTable.filter(item => state.infoTable[item] && state.infoTable[item].info && state.infoTable[item].info.master.id === null);
    
    if(firstMaster[0]){
      const gap = state.indexTable.indexOf(firstMaster[0]);
    if(gap)
      yield put({type: ACTIONS.USER_SCROLL, up: false, max_slots: MAX_SLOTS, scroll_spaces: gap});
    }
    
  }

}

//Fetch the item if is not already fetching
export function *getItem({id}){
  const state = yield select(state => state.siths); 

  //If the item is already fetched don't do anything
  if(state.infoTable[id].status === slotStatus.EMPTY ){
    yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.FETCHING});
    let response = yield call(getSith, id);
    yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.FETCHED, info: response.data});    
  }

}

//if sith is not already fetching, start fetching, also enqueue child fetching
export function *getNextSith({id, index}){
  yield put({type: ACTIONS.UPDATE_INDEX, id: id, index: index});
  yield call(getItem, {id: id});
  
  //Maybe the index has changed since fetch
  const state = yield select(state => state.siths); 
  const newIndex = state.indexTable.indexOf(id);
  const master = state.infoTable[id].info.master.id;
  const apprentice = state.infoTable[id].info.apprentice.id;

  if(newIndex>0 && master && (!state.infoTable[master] || (state.infoTable[master].status === slotStatus.EMPTY))){
    //yield put({type: ACTIONS.FETCH_SITH, id: master,  index: newIndex-1});
    yield call(getOtherSith, {id: master,  index: newIndex-1});
  }
  
  if(newIndex< MAX_SLOTS-1 && apprentice && (!state.infoTable[apprentice] || (state.infoTable[apprentice].status === slotStatus.EMPTY))){
    yield call(getOtherSith, {id: apprentice,  index: newIndex+1});
  }

  console.log(newIndex+" "+state.infoTable[id].info.name)
  if(newIndex===-1)
    yield cancel();
  
  yield call(fixTable);

}

//Get a sith
export function *getOtherSith({id, index}){
  yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.EMPTY});
  //yield call(getNextSith, {id: id, index: index});
  yield put({type: ACTIONS.FETCH_SITH, id: id, index: index});
}

//Saga to invoke first sith according to especification
export function *getFirstSith(){
  yield call(getOtherSith, {id: ID_FIRSTH_SITH, index: Math.floor(MAX_SLOTS/2)});
}

export function *fetchSiths(){

  while (true) {
    const {id, index} = yield take(ACTIONS.FETCH_SITH)
    // fork return a Task object
    const task = yield spawn(getNextSith, {id: id, index: index})
    const finish = take([ACTIONS.CANCEL_FETCH, ACTIONS.SUCESS_FETCH])

  }
}

//Saga to scroll list
export function *scroll(action){
  yield put({type: ACTIONS.SCROLL, up: action.up, max_slots: action.max_slots? action.max_slots:MAX_SLOTS, scroll_spaces: action.scroll_spaces?action.scroll_spaces:SCROLL_SPACES});
  const state = yield select(state => state.siths);
  const element = action.up? state.indexTable.filter(item => item !== -1)[0] : [...state.indexTable].reverse().filter(item => item !== -1)[0];
  const index = state.indexTable.indexOf(element);
  yield put({type: ACTIONS.UPDATE_ITEM, id: element, status: slotStatus.EMPTY});

  if(index !== -1)
    yield call(getOtherSith, {id: element, index: index});
}

//Root saga
export default function *rootSaga() {
    yield all([
      //yield takeEvery(ACTIONS.FETCH_SITH, getOtherSith),
      yield takeLatest(ACTIONS.FIRST_FETCH, getFirstSith),
      yield takeLatest(ACTIONS.USER_SCROLL, scroll),
      yield fetchSiths()
    ])
}