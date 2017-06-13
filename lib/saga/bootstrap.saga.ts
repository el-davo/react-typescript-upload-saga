import { uploadAllSaga } from './upload-all.saga';
import { addToQueueSaga } from './add-to-queue.saga';
import { fork } from 'redux-saga/effects';
import { uploadStartSaga } from './upload-start.saga';

export function* bootstrapSaga() {
    yield [
        fork(addToQueueSaga),
        fork(uploadAllSaga),
        fork(uploadStartSaga)
    ]
}