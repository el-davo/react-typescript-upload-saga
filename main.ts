import { bootstrapSaga } from './lib/saga/bootstrap.saga';
import { uploadReducer } from './lib/reducer/upload.reducer';
import * as actions from './lib/reducer/upload.actions';

export const rtusSaga = bootstrapSaga;
export const rtusReducer = uploadReducer;
export const rtusActions = actions;

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
    uploadUrl: string;
    files: File[];
    isStarted: boolean;
    isComplete: boolean;
    isFailed: boolean;
    failedReason?: string;
    progress: number;
}
