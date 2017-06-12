import { rtusSaga } from '../main';
import { fork } from 'redux-saga/effects';

export function* rootSaga() {
    yield [
        fork(rtusSaga)
    ];
}