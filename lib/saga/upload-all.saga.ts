import { uploadProgressSaga } from './upload-progress.saga';
import { getXhrRequest } from '../service/upload.service';
import { uploadFailed, uploadStart } from '../reducer/upload.actions';
import { RtusUpload, UploadItem } from '../../main';
import { RTUS_UPLOAD_ALL } from '../reducer/upload.action-types';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

function* upload() {
    try {
        let uploadList: RtusUpload = yield select((state: any) => state.rtusUpload);

        yield* Object.keys(uploadList.queue).map(function* (key) {
            if (!uploadList.queue[key].isStarted && !uploadList.queue[key].isComplete) {
                yield put(uploadStart(uploadList.queue[key]));
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export function* uploadAllSaga() {
    yield* takeEvery(RTUS_UPLOAD_ALL, upload);
}