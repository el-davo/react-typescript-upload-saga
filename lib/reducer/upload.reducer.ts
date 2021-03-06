import { guid } from '../utils/utils';
import * as actionTypes from './upload.action-types';
import { FileMetadata, RtusUpload, upload, UploadItem, CustomFormData, CustomHeaderData } from '../../index';

interface Action {
    type: string;
    fileMetadata?: FileMetadata;
    uploadUrl?: string;
    formData?: FormData;
    uploadItem?: UploadItem;
    uploadItemId?: string;
    progress?: number;
    secondsRemaining?: number;
    bytesPerSecond?: number;
    failedReason?: string;
    customCompleteAction: string;
    customFormData?: CustomFormData;
    customHeaderData?: CustomHeaderData;
}

export function uploadReducer(state: RtusUpload = upload, action: Action): RtusUpload {
    switch (action.type) {
        case actionTypes.RTUS_COMMIT_TO_UPLOAD_QUEUE:
            const id = guid();
            return {
                ...state,
                queue: {
                    ...state.queue, [id]: {
                        id, fileMetadata:
                        action.fileMetadata,
                        isStarted: false,
                        isComplete: false,
                        isFailed: false,
                        progress: 0,
                        secondsRemaining: 0,
                        bytesPerSecond: 0,
                        startedAt: null,
                        formData:
                        action.formData,
                        uploadUrl: action.uploadUrl,
                        customCompleteAction: action.customCompleteAction,
                        customFormData: action.customFormData,
                        customHeaderData: action.customHeaderData
                    }
                }
            };
        case actionTypes.RTUS_UPLOAD_START:
            return {
                ...state,
                queue: {
                    ...state.queue, [action.uploadItemId]: {
                        ...state.queue[action.uploadItemId],
                        isStarted: true,
                        startedAt: new Date()
                    }
                }
            };
        case actionTypes.RTUS_UPLOAD_FINISHED:
            return {
                ...state,
                queue: {
                    ...state.queue, [action.uploadItem.id]:
                    {
                        ...state.queue[action.uploadItem.id],
                        isStarted: false,
                        isComplete: true
                    }
                }
            };
        case actionTypes.RTUS_UPLOAD_PROGRESS:
            return {
                ...state,
                queue: {
                    ...state.queue, [action.uploadItem.id]: {
                        ...state.queue[action.uploadItem.id],
                        progress: action.progress,
                        secondsRemaining: action.secondsRemaining,
                        bytesPerSecond: action.bytesPerSecond
                    }
                }
            };
        case actionTypes.RTUS_UPLOAD_FAILED:
            return {
                ...state,
                queue: {
                    ...state.queue, [action.uploadItem.id]: {
                        ...state.queue[action.uploadItem.id],
                        isStarted: false,
                        isFailed: true,
                        failedReason: action.failedReason
                    }
                }
            };
        case actionTypes.RTUS_REMOVE_ALL_FILES:
            return { ...state, queue: {} };
        case actionTypes.RTUS_REMOVE_FILE:
            return { ...state, queue: {} };
        default:
            return state;
    }
}
