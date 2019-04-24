import {call, all} from 'redux-saga/effects';

import {saga as currentPlanet} from '../modules/currentPlanet'
import {saga as requests} from '../modules/requests'

export default function*() {
    yield all([
        currentPlanet,
        requests
    ].map(call))
}
