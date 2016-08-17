import {
  call, cancel, cancelled, fork, select, take, put,
} from 'redux-saga/effects';
import xhr from 'xhr';

import { getCurrentPlanetMatch, getNextSithIdToLoad } from './queries';
import { OBI_WAN_MOVED, SITH_LOADED, UP, DOWN, actionCreators } from './actions';
import { SITHS_API, INITIAL_SITH_ID } from './config';

const requests = {
  [UP]: null,
  [DOWN]: null,
};

export default function* main(){
  yield fork(makeRequest, INITIAL_SITH_ID);

  while(true) {
    const action = yield take('*');
    yield fork(cancelUnnecessaryRequests, action.type);
    yield fork(makeNecessaryRequests);
  }
}

function* makeNecessaryRequests() {
  if (yield select(getCurrentPlanetMatch)) return;

  yield [UP, DOWN]
    .filter(direction => !requests[direction])
    .map(direction => call(function* () {
      const nextSithId = yield select(getNextSithIdToLoad(direction));
      if (nextSithId) {
        requests[direction] = yield fork(makeRequest, nextSithId, direction)
      }
    }));
}

function* cancelUnnecessaryRequests(actionType) {
  let requestsToCancel = [];

  switch (actionType) {
    case OBI_WAN_MOVED:
    case SITH_LOADED: {
      const match = yield select(getCurrentPlanetMatch);
      if (match) requestsToCancel = [UP, DOWN];
      break;
    }
    case UP:
    case DOWN: {
      const oppositeDirection = actionType === UP ? DOWN : UP;
      const nextSithId = yield select(getNextSithIdToLoad(oppositeDirection));
      if (!nextSithId) requestsToCancel = [oppositeDirection];
      break;
    }
    default:
      requestsToCancel = [];
  }

  yield requestsToCancel
    .filter(key => requests[key])
    .map(key => cancel(requests[key]));
}

function* makeRequest(sithId, direction) {
  let request;

  try {
    const getSith = () => new Promise((resolve, reject) => {
      request = xhr({ uri: `${SITHS_API}/${sithId}` }, (err, resp, body) => {
        return err ? reject(err) : resolve(JSON.parse(body));
      });
    });
    const sith = yield call(getSith);
    yield put(actionCreators.onSithLoaded(sith, direction));
  } catch (e) {
    console.error('Ups, this was not supposed to happen: ' + e.message, e);
  }
  finally {
    requests[direction] = undefined;
    if (yield cancelled()) return yield request.abort();
  }
}
