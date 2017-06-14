import { uploadProgressSaga } from './upload-progress.saga';
import { getXhrRequest } from '../service/upload.service';
import { commitToUploadQueue, addToUploadQueueFailed } from '../reducer/upload.actions';
import { UploadItem } from '../../index';
import { RTUS_ADD_TO_UPLOAD_QUEUE, RTUS_UPLOAD_START } from '../reducer/upload.action-types';
import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

function* fetch({ uploadUrl, files }: { uploadUrl: string, files: File[] }) {
    try {
        let xhrRequest: XMLHttpRequest = getXhrRequest();

        for (let file of files) {
            let data = new FormData();
            data.append('file', file, file.name);

            yield put(commitToUploadQueue(uploadUrl, { name: file.name, size: file.size }, data));
        }
    } catch (err) {
        yield put(addToUploadQueueFailed(err));
    }
}

export function* addToQueueSaga() {
    yield* takeEvery(RTUS_ADD_TO_UPLOAD_QUEUE, fetch);
}