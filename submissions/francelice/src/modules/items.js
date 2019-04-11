import { put, takeEvery, takeLatest, all, call, select, take } from 'redux-saga/effects'
import { getSith } from '../api'

const slotStatus = {EMPTY: 'EMPTY', FETCHING: 'FETCHING', FETCHED: 'FETCHED'};
const MAX_SLOTS = 5;
const ID_FIRSTH_SITH = 3616;

//Actions
export const ACTIONS = {
    SCROLL : 'SCROLL',
    UPDATE_LIST : 'UPDATE_LIST',
    FIRST_FETCH : 'FIRST_FETCH',
    UPDATE_ITEM: 'UPDATE_ITEM',
    UPDATE_INDEX: 'UPDATE_INDEX'

};

//Action creators
export const firstSith = {type: ACTIONS.FIRST_FETCH};
export const scrollUp = {type: ACTIONS.SCROLL, up: true}
export const scrollDown = {type: ACTIONS.SCROLL, up: false}

//reducers
const initialState = {
  infoTable: {}, //Every Item will be of the form {id: {info, status}}
  indexTable: Array(5).fill(-1) //Every item will be the id of the current sloth's sith 
}


export const reducers = (state = initialState, action) => {
    switch (action.type) {

      //Update ordered table
      case ACTIONS.UPDATE_INDEX:
        let indexTable = [...state.indexTable];
        indexTable[action.index] = action.id
        return Object.assign({},state,{indexTable: indexTable})
      
      case ACTIONS.UPDATE_ITEM:
        let infoTable = {...state.infoTable};
        infoTable[action.id] = Object.assign({}, action);
        delete infoTable[action.id].type
        return Object.assign({}, state, {infoTable: infoTable})

      case ACTIONS.SCROLL:
        const leaving = action.up? state[MAX_SLOTS - 1]:state[0];
        return state;

      default:
        return state
    }
  }
  

//sagas 
export function *getItem({id, index, status}){
  yield put({type: ACTIONS.UPDATE_INDEX, id: id, index: index});
  yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: status});
  let newSith = yield getSith(id).then((response) =>  response.json());
  yield put({type: ACTIONS.UPDATE_ITEM, id: id, status: slotStatus.FETCHED, info: newSith});
}


export function *getFirstItem(){
  yield call(getItem, {id: ID_FIRSTH_SITH, index: Math.floor(MAX_SLOTS/2), status: slotStatus.EMPTY});
}

export function* watchGetNewItem() {
  yield takeLatest(ACTIONS.FIRST_FETCH, getFirstItem);
}


export function *scroll(action){
  yield put({type: ACTIONS.SCROLL, action});

}


export function* watchScroll() {
  yield takeEvery([ACTIONS.SCROLL], scroll);
}


export default function *rootSaga() {
    yield all([
        watchGetNewItem()
    ])
}