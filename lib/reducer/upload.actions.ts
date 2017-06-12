import * as actionTypes from './upload.action-types';
import { UploadItem } from '../../main';

export function rtusAddToUploadQueue(uploadUrl: string, files: File[]) {
    return { type: actionTypes.RTUS_ADD_TO_UPLOAD_QUEUE, uploadUrl, files };
}

export function rtusUploadStart(uploadItem: UploadItem) {
    return { type: actionTypes.RTUS_UPLOAD_START, uploadItem };
}

export function rtusUploadFinished(uploadItem: UploadItem) {
    return { type: actionTypes.RTUS_UPLOAD_FINISHED, uploadItem };
}

export function rtusUploadProgress(uploadItem: UploadItem, progress: number) {
    return { type: actionTypes.RTUS_UPLOAD_PROGRESS, uploadItem, progress };
}

export function rtusUploadFailed(uploadItem: UploadItem) {
    return { type: actionTypes.RTUS_UPLOAD_FAILED, uploadItem };
}