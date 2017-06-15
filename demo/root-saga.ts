import { customUploadCompleteSaga } from './saga/custom-upload-complete.saga';
import { rtusSaga } from '../index';
import { fork } from 'redux-saga/effects';

export function* rootSaga() {
    yield [
        fork(rtusSaga),
        fork(customUploadCompleteSaga)
    ];
}
