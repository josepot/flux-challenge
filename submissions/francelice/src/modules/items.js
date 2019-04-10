import { put, takeEvery, takeLatest, all, call, select, take } from 'redux-saga/effects'

//Actions
export const ACTIONS = {
    SCROLL_DOWN : 'SCROLL_DOWN',
    SCROLL_UP : 'SCROLL_UP',
    UPDATE_LIST : 'UPDATE_LIST'

};

//Action creators
export const updateSiths = newItem => ({
    type: ACTIONS.UPDATE_LIST,
    item: newItem,
    top: true
})

//reducers
export const reducers = (state = [], action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_LIST:
        return [
            ...state,
            action.item
        ]
      default:
        return state
    }
  }
  

//sagas 
export function *getNewItem(action){
   yield console.log(action);
}

export function* watchGetNewItem() {
    yield takeEvery([ACTIONS.SCROLL_DOWN, ACTIONS.SCROLL_UP], getNewItem);
}

export default function *rootSaga() {
    yield all([
        watchGetNewItem(),
    ])
  }