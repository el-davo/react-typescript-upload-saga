import { uploadProgressSaga } from './upload-progress.saga';
import { getXhrRequest } from '../service/upload.service';
import { commitToUploadQueue, addToUploadQueueFailed } from '../reducer/upload.actions';
import { UploadItem } from '../../index';
import { RTUS_ADD_TO_UPLOAD_QUEUE, RTUS_UPLOAD_START } from '../reducer/upload.action-types';
import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

function* fetch({ uploadUrl, files, customCompleteAction }: { uploadUrl: string, files: File[], customCompleteAction: string }) {
    try {
        const xhrRequest: XMLHttpRequest = getXhrRequest();

        for (const file of files) {
            const data = new FormData();
            data.append('file', file, file.name);

            yield put(commitToUploadQueue(uploadUrl, { name: file.name, size: file.size }, data, customCompleteAction));
        }
    } catch (err) {
        yield put(addToUploadQueueFailed(err));
    }
}

export function* addToQueueSaga() {
    yield* takeEvery(RTUS_ADD_TO_UPLOAD_QUEUE, fetch);
}
