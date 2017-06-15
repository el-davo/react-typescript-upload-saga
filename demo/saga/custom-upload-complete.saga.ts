import { CUSTOM_UPLOAD_COMPLETE, REPORT_UPLOAD_COMPLETE } from '../upload/upload.action-types';
import { UploadItem } from '../../index';
import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

function* uploadComplete({ response }) {
    yield put({ type: REPORT_UPLOAD_COMPLETE, response });
}

export function* customUploadCompleteSaga() {
    yield* takeEvery(CUSTOM_UPLOAD_COMPLETE, uploadComplete);
}
