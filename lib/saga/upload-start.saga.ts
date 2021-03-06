import { uploadProgressSaga } from './upload-progress.saga';
import { getXhrRequest } from '../service/upload.service';
import { uploadFailed } from '../reducer/upload.actions';
import { UploadItem } from '../../index';
import { RTUS_UPLOAD_START } from '../reducer/upload.action-types';
import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';

function* upload({ uploadItemId }: { uploadItemId: string }) {

    const uploadItem: UploadItem = yield select((state: any) => state.rtusUpload.queue[uploadItemId]);

    try {
        const xhrRequest: XMLHttpRequest = getXhrRequest();

        xhrRequest.open('POST', uploadItem.uploadUrl, true);

        Object.keys(uploadItem.customHeaderData).map((key) => {
            xhrRequest.setRequestHeader(key, uploadItem.customHeaderData[key]);
        });

        yield [
            fork(uploadProgressSaga, uploadItem, xhrRequest)
        ];
    } catch (err) {
        yield put(uploadFailed(uploadItem, err));
    }
}

export function* uploadStartSaga() {
    yield* takeEvery(RTUS_UPLOAD_START, upload);
}
