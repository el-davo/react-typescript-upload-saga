import { CustomFormData } from '../..';
import { uploadProgressSaga } from './upload-progress.saga';
import { getXhrRequest } from '../service/upload.service';
import { commitToUploadQueue, addToUploadQueueFailed } from '../reducer/upload.actions';
import { UploadItem, FileMetadata, CustomHeaderData } from '../../index';
import { RTUS_ADD_TO_UPLOAD_QUEUE, RTUS_UPLOAD_START } from '../reducer/upload.action-types';
import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

function* fetch(
    { uploadUrl, files, customCompleteAction, customFormData, customHeaderData }:
        {
            uploadUrl: string,
            files: File[],
            customCompleteAction: string,
            customFormData: CustomFormData,
            customHeaderData: CustomHeaderData
        }) {
    try {
        for (const file of files) {
            const data = new FormData();
            data.append('file', file, file.name);

            Object.keys(customFormData).map((key) => {
                data.append(key, customFormData[key]);
            });

            const fileMetadata = {
                name: file.name,
                size: file.size
            } as FileMetadata;

            yield put(commitToUploadQueue(uploadUrl, fileMetadata, data, customCompleteAction, customHeaderData));
        }
    } catch (err) {
        yield put(addToUploadQueueFailed(err));
    }
}

export function* addToQueueSaga() {
    yield* takeEvery(RTUS_ADD_TO_UPLOAD_QUEUE, fetch);
}
