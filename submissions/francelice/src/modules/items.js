import { put, takeEvery, takeLatest, all, call, select, take } from 'redux-saga/effects'
import { getSith } from '../api'

//Actions
export const ACTIONS = {
    SCROLL_DOWN : 'SCROLL_DOWN',
    SCROLL_UP : 'SCROLL_UP',
    UPDATE_LIST : 'UPDATE_LIST',
    FIRST_FETCH : 'FIRST_FETCH'

};

//Action creators
export const updateSiths = newItem => ({
    type: ACTIONS.UPDATE_LIST,
    item: newItem,
    top: true
})


//reducers
export const reducers = (state = [{},{},{},{},{}], action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_LIST:
        var newState = [...state];
        newState[2] = action.newSith;
        return newState
      default:
        return state
    }
  }
  

//sagas 
export function *getNewItem(id){
  let newSith = yield getSith(id).then((response) =>  response.json());
  yield put({type: ACTIONS.UPDATE_LIST, newSith: newSith});
}

export function* watchGetFirstItem() {
  yield takeEvery([ACTIONS.FIRST_FETCH], getNewItem, 3616);
}

export function* watchGetNewItem() {
    yield takeEvery([ACTIONS.SCROLL_DOWN, ACTIONS.SCROLL_UP ], getNewItem);
}

export default function *rootSaga() {
    yield all([
        watchGetNewItem(),
        watchGetFirstItem()
    ])
}