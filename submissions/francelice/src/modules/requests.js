import {compose, not, includes} from 'ramda';
import {call, put, select, cancel, cancelled, fork, take} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {UP, DOWN, INITIAL_SITH_ID} from './constants';
import {getNextMasterId, getNextApprenticeId, getSithsHomeIds, onSithLoaded, getPaddingTop, getPaddingBottom, SITH_LOADED, SCROLL} from './siths';
import {getCurrentPlanetId, OBI_WAN_MOVED} from './currentPlanet';
import {getSith} from '../api';

export const getIsObiWanSafe = createSelector(
  [getCurrentPlanetId, getSithsHomeIds],
  compose(not, includes)
);

const nextIdToLoad = (padding, sithId) => padding > 0 ? sithId : null;
const getNextMasterIdToLoad = createSelector(
  [getPaddingTop, getNextMasterId],
  nextIdToLoad
)

const getNextApprenticeIdToLoad = createSelector(
  [getPaddingBottom, getNextApprenticeId],
  nextIdToLoad
)

const getNextSithIdToLoad = direction => direction === UP
  ? getNextMasterIdToLoad
  : getNextApprenticeIdToLoad;

const requests = {
  [UP]: {isRunning: () => false},
  [DOWN]: {isRunning: () => false},
};

export function* saga(){
  yield fork(makeRequest, INITIAL_SITH_ID);

  while(true) {
    const action = yield take('*');

    const isObiWanSafe = yield select(getIsObiWanSafe);
    if (!isObiWanSafe) {
      yield cancel([UP, DOWN].map(d => requests[d]).filter(t => t.isRunning()));
      continue;
    }

    if (action.type === SCROLL) {
      yield fork(cancelScrollRequests, action.payload.direction);
    }

    console.log(action.type);
    yield fork(makeNecessaryRequests);
  }
}

function* makeNecessaryRequests() {
  yield* [UP, DOWN]
    .filter(direction => !requests[direction].isRunning())
    .map(direction => fork(function* () {
      const nextSithId = yield select(getNextSithIdToLoad(direction));
      if (nextSithId != null) {
        requests[direction] = yield fork(makeRequest, nextSithId, direction)
      }
    }));
}

function* cancelScrollRequests(direction) {
  const oppositeDirecction = direction === UP ? DOWN : UP;
  const oppositePading = yield select(direction === UP ? getPaddingBottom : getPaddingTop);
  if (oppositePading === 0) {
    yield cancel(requests[oppositeDirecction]);
  }
}

function* makeRequest(sithId, direction) {
  const {promise, cancel} = yield call(getSith, sithId);
  try {
    const sith = yield call(() => promise);
    yield put(onSithLoaded(sith, direction));
  } catch (e) {
  }
  finally {
    if (yield cancelled()) {
      yield call(cancel);
    }
  }
}
