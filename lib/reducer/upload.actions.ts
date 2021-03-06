import * as actionTypes from './upload.action-types';
import { FileMetadata, UploadItem, CustomFormData, CustomHeaderData } from '../../index';

export function addToUploadQueue(
    uploadUrl: string,
    files: File[],
    customCompleteAction: string,
    customFormData: CustomFormData,
    customHeaderData: CustomHeaderData) {
    return {
        type: actionTypes.RTUS_ADD_TO_UPLOAD_QUEUE,
        uploadUrl,
        files,
        customCompleteAction,
        customFormData,
        customHeaderData
    };
}

export function addToUploadQueueFailed(reason: string) {
    return { type: actionTypes.RTUS_ADD_TO_UPLOAD_QUEUE_FAILED, reason };
}

export function commitToUploadQueue(
    uploadUrl: string,
    fileMetadata: FileMetadata,
    formData: FormData,
    customCompleteAction: string,
    customHeaderData: CustomHeaderData) {
    return {
        type: actionTypes.RTUS_COMMIT_TO_UPLOAD_QUEUE,
        uploadUrl,
        fileMetadata,
        formData,
        customCompleteAction,
        customHeaderData
    };
}

export function uploadAll() {
    return { type: actionTypes.RTUS_UPLOAD_ALL };
}

export function uploadAllFailed(err: string) {
    return { type: actionTypes.RTUS_UPLOAD_ALL_FAILED, err };
}

export function uploadStart(uploadItemId: string) {
    return { type: actionTypes.RTUS_UPLOAD_START, uploadItemId };
}

export function uploadFinished(uploadItem: UploadItem) {
    return { type: actionTypes.RTUS_UPLOAD_FINISHED, uploadItem };
}

export function uploadProgress(uploadItem: UploadItem, progress: number, secondsRemaining: number, bytesPerSecond: number) {
    return { type: actionTypes.RTUS_UPLOAD_PROGRESS, uploadItem, progress, secondsRemaining, bytesPerSecond };
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
