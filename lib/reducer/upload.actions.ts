import * as actionTypes from './upload.action-types';
import { FileMetadata, UploadItem } from '../../index';

export function addToUploadQueue(uploadUrl: string, files: File[]) {
    return { type: actionTypes.RTUS_ADD_TO_UPLOAD_QUEUE, uploadUrl, files };
}

export function addToUploadQueueFailed(reason: string) {
    return { type: actionTypes.RTUS_ADD_TO_UPLOAD_QUEUE_FAILED, reason };
}

export function commitToUploadQueue(uploadUrl: string, fileMetadata: FileMetadata, formData: FormData) {
    return { type: actionTypes.RTUS_COMMIT_TO_UPLOAD_QUEUE, uploadUrl, fileMetadata, formData };
}

export function uploadAll() {
    return { type: actionTypes.RTUS_UPLOAD_ALL };
}

export function uploadAllFailed() {
    return { type: actionTypes.RTUS_UPLOAD_ALL_FAILED };
}

export function uploadStart(uploadItem: UploadItem) {
    return { type: actionTypes.RTUS_UPLOAD_START, uploadItem };
}

export function uploadFinished(uploadItem: UploadItem) {
    return { type: actionTypes.RTUS_UPLOAD_FINISHED, uploadItem };
}

export function uploadProgress(uploadItem: UploadItem, progress: number) {
    return { type: actionTypes.RTUS_UPLOAD_PROGRESS, uploadItem, progress };
}

export function uploadFailed(uploadItem: UploadItem, failedReason: string) {
    return { type: actionTypes.RTUS_UPLOAD_FAILED, uploadItem, failedReason };
}

export function removeAllFiles() {
    return { type: actionTypes.RTUS_REMOVE_ALL_FILES };
}

export function removeFile(id: string) {
    return { type: actionTypes.RTUS_REMOVE_FILE };
}
