import { uploadFailed } from '../reducer/upload.actions';
import { listendForXhrProgress } from '../service/upload.service';
import { takeLatest } from 'redux-saga';
import { UploadItem } from '../../index';
import { call, put, take } from 'redux-saga/effects';

export function* uploadProgressSaga(uploadItem: UploadItem, xhrRequest: XMLHttpRequest) {
    try {
        const channel = yield call(listendForXhrProgress, uploadItem, xhrRequest);

        while (true) {
            const action = yield take(channel);

            yield put(action);
        }
    } catch (err) {
        yield put(uploadFailed(uploadItem, err));
    }
}
