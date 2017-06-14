import { UploadItem } from '../../main';
import { uploadFailed, uploadFinished, uploadProgress } from '../reducer/upload.actions';
import { eventChannel } from 'redux-saga';

export function getXhrRequest(): XMLHttpRequest {
    let xmlhttp;

    if ((<any>window).XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlhttp;
}

export function listendForXhrProgress(uploadItem: UploadItem, xhrRequest: XMLHttpRequest) {
    return eventChannel(emitter => {

        xhrRequest.upload.onprogress = event => {
            let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);

            emitter(uploadProgress(uploadItem, progress));
        };

        xhrRequest.onload = () => {
            emitter(_isSuccessCode(xhrRequest.status) ? uploadFinished(uploadItem) : uploadFailed(uploadItem, xhrRequest.responseText));
        };

        xhrRequest.onerror = event => {
            emitter(uploadFailed(uploadItem, event.error));
        };

        xhrRequest.send(uploadItem.formData);

        return () => {
        };
    });
}

function _isSuccessCode(code: number) {
    return (code >= 200 && code < 300) || code === 304;
}