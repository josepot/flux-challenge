import { put, takeEvery, takeLatest, all, call, select } from 'redux-saga/effects'
import { getSith } from '../api'

const slotStatus = {EMPTY: 'EMPTY', FETCHING: 'FETCHING', FETCHED: 'FETCHED'};
const MAX_SLOTS = 5;
const SCROLL_SPACES = 2;
const ID_FIRSTH_SITH = 3616;

//Helpers
const getScrollSlots = (maxSlots, scrollSlots) => (maxSlots <= scrollSlots && scrollSlots<=1 ? 1 : scrollSlots)
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

export function *getItem({id}){
  const state = yield select(state => state.siths); 
  //If the item is already fetched don't do anything
  if(state.infoTable[id].status === slotStatus.EMPTY ){
    yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.FETCHING});
    let newSith = yield getSith(id).then((response) =>  response.json());
    yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.FETCHED, info: newSith});    
  }

}

export function *getNextSith({id, index}){
  yield put({type: ACTIONS.UPDATE_INDEX, id: id, index: index});
  
  const state = yield select(state => state.siths); 
  if(!state.infoTable[id] || (state.infoTable[id].status === slotStatus.EMPTY)){
    yield call(getItem, {id: id});
  }

  const newState = yield select(state => state.siths); 
  const newIndex = newState.indexTable.indexOf(id);
  const master = newState.infoTable[id].info.master.id;
  const apprentice = newState.infoTable[id].info.apprentice.id;

  if(newIndex>0 && master && (!newState.infoTable[master] || (newState.infoTable[master].status === slotStatus.EMPTY))){
    yield put({type: ACTIONS.FETCH_SITH, id: master,  index: newIndex-1});
  }
  
  if(newIndex< MAX_SLOTS-1 && apprentice && (!newState.infoTable[apprentice] || (newState.infoTable[apprentice].status === slotStatus.EMPTY))){
    yield put({type: ACTIONS.FETCH_SITH, id: apprentice,  index: newIndex+1});
  }
  
  yield call(fixTable);

}

export function *getOtherSith({id, index}){
  yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.EMPTY});
  yield call(getNextSith, {id: id, index: index});
}

export function *getFirstSith(){
  yield call(getOtherSith, {id: ID_FIRSTH_SITH, index: Math.floor(MAX_SLOTS/2)});
}


export function *scroll(action){
  yield put({type: ACTIONS.SCROLL, up: action.up, max_slots: action.max_slots? action.max_slots:MAX_SLOTS, scroll_spaces: action.scroll_spaces?action.scroll_spaces:SCROLL_SPACES});
  const state = yield select(state => state.siths);
  const element = action.up? state.indexTable.filter(item => item !== -1)[0] : [...state.indexTable].reverse().filter(item => item !== -1)[0];
  const index = state.indexTable.indexOf(element);
  yield put({type: ACTIONS.UPDATE_ITEM, id: element, status: slotStatus.EMPTY});

  if(index !== -1)
    yield call(getOtherSith, {id: element, index: index});
}


export default function *rootSaga() {
    yield all([
      yield takeEvery(ACTIONS.FETCH_SITH, getOtherSith),
      yield takeLatest(ACTIONS.FIRST_FETCH, getFirstSith),
      yield takeLatest(ACTIONS.USER_SCROLL, scroll)
    ])
}