import { rtusSaga } from '../index';
import { fork } from 'redux-saga/effects';

export function* rootSaga() {
    yield [
        fork(rtusSaga)
    ];
}
