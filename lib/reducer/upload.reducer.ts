import { guid } from '../utils/utils';
import * as actionTypes from './upload.action-types';
import { FileMetadata, RtusUpload, upload, UploadItem } from '../../index';

interface Action {
    type: string;
    fileMetadata?: FileMetadata;
    uploadUrl?: string;
    formData?: FormData;
    uploadItem?: UploadItem;
    progress?: number;
    failedReason?: string;
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
                        formData:
                        action.formData,
                        uploadUrl: action.uploadUrl
                    }
                }
            };
        case actionTypes.RTUS_UPLOAD_START:
            return {
                ...state,
                queue: {
                    ...state.queue, [action.uploadItem.id]: {
                        ...state.queue[action.uploadItem.id],
                        isStarted: true
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
                        progress: action.progress
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
