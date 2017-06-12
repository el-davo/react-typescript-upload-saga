import { fork } from 'redux-saga/effects';
import { uploadStart } from './upload-start.saga';

export function* bootstrapSaga() {
    yield [
        fork(uploadStart)
    ]
}