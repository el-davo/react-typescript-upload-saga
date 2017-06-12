import { uploadProgressSaga } from './upload-progress.saga';
import { getXhrRequest } from '../service/upload.service';
import { rtusUploadFailed } from '../reducer/upload.actions';
import { UploadItem } from '../../main';
import { RTUS_UPLOAD_START } from '../reducer/upload.action-types';
import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

function* fetch({ uploadItem }: { uploadItem: UploadItem }) {
    try {
        let xhrRequest: XMLHttpRequest = getXhrRequest();

        yield [
            fork(uploadProgressSaga, uploadItem, xhrRequest)
        ];
    } catch (err) {
        yield put(rtusUploadFailed(uploadItem));
    }
}

export function* uploadStart() {
    yield* takeEvery(RTUS_UPLOAD_START, fetch);
}