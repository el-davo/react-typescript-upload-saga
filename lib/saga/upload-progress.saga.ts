import { listendForXhrProgress } from '../service/upload.service';
import { takeLatest } from 'redux-saga';
import { UploadItem } from '../../main';
import { call, put, take } from 'redux-saga/effects';

export function* uploadProgressSaga(uploadItem: UploadItem, xhrRequest: XMLHttpRequest) {
    try {
        let channel = yield call(listendForXhrProgress, uploadItem, xhrRequest);

        while (true) {
            let action = yield take(channel);

            yield put(action);
        }
    } catch (err) {
        console.log(err);
    }
}