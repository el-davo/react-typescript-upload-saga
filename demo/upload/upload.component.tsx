import { rtusUploadStart } from '../../lib/reducer/upload.actions';
import { RtusUpload, UploadItem } from '../../main';
import { Card, CardText } from 'material-ui/Card';
import * as React from 'react';

interface Props {
    rtusUpload: RtusUpload;
    rtusAddToUploadQueue(uploadUrl: string, file: File);
}

export class UploadComponent extends React.Component<Props, any> {

    constructor(props, context) {
        super(props, context);

        this._addFileToQueue = this._addFileToQueue.bind(this);
    }

    _addFileToQueue(event) {
        console.log(event.target.files);
        //var file = document.getElementById("uploadfile");

        this.props.rtusAddToUploadQueue('http://localhost:3000', event.target.files);
    }

    render() {
        return (
            <div>
                <input id="upload" ref="upload" type="file"
                    onChange={this._addFileToQueue} />
                <table>
                    {
                        Object.keys(this.props.rtusUpload.queue).map(key => {
                            return <tr>
                                <td></td>
                            </tr>
                        })
                    }
                </table>
            </div>
        );
    }
}