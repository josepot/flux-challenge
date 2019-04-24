import {prop} from 'ramda';
import {eventChannel} from 'redux-saga';
import {call, put, take} from 'redux-saga/effects';
import {createSelector} from 'reselect';

const PORT = 4000;
export const OBI_WAN_MOVED = 'OBI_WAN_MOVED';

const onObiWanMove = planet => ({ type: OBI_WAN_MOVED, payload: planet });

export default (state = null, {type, payload}) => type === OBI_WAN_MOVED
  ? payload
  : state;

export const getCurrentPlanet = prop('currentPlanet')
export const getCurrentPlanetName = createSelector(getCurrentPlanet, prop('name'));
export const getCurrentPlanetId = createSelector(getCurrentPlanet, prop('id'));

const createSocketChannel = port => eventChannel(emit => {
  const ws = new WebSocket(`ws://localhost:${port}`);
  ws.onmessage = e => emit(JSON.parse(e.data));
  return () => ws.close;
});

export function* saga() {
  const chan = yield call(createSocketChannel, PORT);
  while (true) {
    const planet = yield take(chan);
    yield put(onObiWanMove(planet));
  }
}
