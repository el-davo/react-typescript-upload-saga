import { guid } from '../utils/utils';
import * as actionTypes from './upload.action-types';
import { upload, RtusUpload, UploadItem } from '../../main';

interface Action {
    type: string;
    uploadUrl?: string;
    files?: File[];
    uploadItem?: UploadItem;
    progress?: number;
    failedReason?: string;
}

export function uploadReducer(state: RtusUpload = upload, action: Action): RtusUpload {
    switch (action.type) {
        case actionTypes.RTUS_ADD_TO_UPLOAD_QUEUE:
            let id = guid();
            return { ...state, queue: { ...state.queue, [id]: { isStarted: false, isComplete: false, isFailed: false, progress: 0, files: [...action.files], id, uploadUrl: action.uploadUrl } } };
        case actionTypes.RTUS_UPLOAD_START:
            return { ...state, queue: { ...state.queue, [action.uploadItem.id]: { ...state[action.uploadItem.id], isStarted: true } } };
        case actionTypes.RTUS_UPLOAD_FINISHED:
            return { ...state, queue: { ...state.queue, [action.uploadItem.id]: { ...state[action.uploadItem.id], isStarted: false, isComplete: true } } };
        case actionTypes.RTUS_UPLOAD_PROGRESS:
            return { ...state, queue: { ...state.queue, [action.uploadItem.id]: { ...state[action.uploadItem.id], progress: action.progress } } };
        case actionTypes.RTUS_UPLOAD_FAILED:
            return { ...state, queue: { ...state.queue, [action.uploadItem.id]: { ...state[action.uploadItem.id], isStarted: false, isFailed: true, failedReason: action.failedReason } } };
        default:
            return state;
    }
}