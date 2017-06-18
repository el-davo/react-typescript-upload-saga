import { UploadItem } from '../../index';
import { uploadFailed, uploadFinished, uploadProgress } from '../reducer/upload.actions';
import { eventChannel } from 'redux-saga';

export function getXhrRequest(): XMLHttpRequest {
    return (window as any).XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
}

export function listendForXhrProgress(uploadItem: UploadItem, xhrRequest: XMLHttpRequest) {
    return eventChannel((emitter) => {

        xhrRequest.upload.onprogress = (event) => {
            const progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            const secondsElapsed = (new Date().getTime() - uploadItem.startedAt.getTime()) / 1000;
            const remainingBytes = event.total - event.loaded;
            const bytesPerSecond = Math.floor(event.loaded / secondsElapsed);
            const secondsRemaining = Math.floor(remainingBytes / bytesPerSecond);

            emitter(uploadProgress(uploadItem, progress, secondsRemaining, bytesPerSecond));
        };

        xhrRequest.onload = () => {
            if (_isSuccessCode(xhrRequest.status)) {
                emitter(uploadFinished(uploadItem));
                emitter({ type: uploadItem.customCompleteAction, response: JSON.parse(xhrRequest.response) });
            } else {
                emitter(uploadFailed(uploadItem, xhrRequest.responseText));
            }
        };

        xhrRequest.onerror = (event) => {
            emitter(uploadFailed(uploadItem, event.error));
        };

        xhrRequest.send(uploadItem.formData);

        return () => {
            emitter(uploadFinished(uploadItem));
        };
    });
}

function _isSuccessCode(code: number) {
    return (code >= 200 && code < 300) || code === 304;
}
