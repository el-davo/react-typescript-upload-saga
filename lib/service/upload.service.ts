import { UploadItem } from '../../main';
import { uploadProgress } from '../reducer/upload.actions';
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

        xhrRequest.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                emitter(uploadProgress(uploadItem, percentComplete * 100));
            }
        }, false);

        return () => {
        };
    });
}