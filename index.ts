import { bootstrapSaga } from './lib/saga/bootstrap.saga';
import { uploadReducer } from './lib/reducer/upload.reducer';
import { addToUploadQueue, uploadAll, removeAllFiles, removeFile } from './lib/reducer/upload.actions';

export const rtusSaga = bootstrapSaga;
export const rtusReducer = uploadReducer;
export const rtusAddToUploadQueue = addToUploadQueue;
export const rtusUploadAll = uploadAll;
export const rtusRemoveAllFiles = removeAllFiles;
export const rtusRemoveFile = removeFile;

export const upload = {
    queue: {}
} as RtusUpload;

export interface RtusUpload {
    queue: UploadQueue;
}

interface UploadQueue {
    [key: string]: UploadItem;
}

export interface UploadItem {
    id: string;
    fileMetadata: FileMetadata;
    uploadUrl: string;
    formData: FormData;
    isStarted: boolean;
    isComplete: boolean;
    isFailed: boolean;
    failedReason?: string;
    progress: number;
    customCompleteAction: string;
    customFormData: CustomFormData;
    customHeaderData: CustomHeaderData;
    startedAt?: Date;
    secondsRemaining?: number;
    bytesPerSecond?: number;
}

export interface CustomFormData {
    [key: string]: any;
}

export interface CustomHeaderData {
    [key: string]: any;
}

export interface FileMetadata {
    name: string;
    size: number;
}
