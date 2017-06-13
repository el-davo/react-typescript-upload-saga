import { RtusUpload, UploadItem, rtusUploadAll } from '../../main';
import { Card, CardText } from 'material-ui/Card';
import * as React from 'react';

interface Props {
    rtusUpload: RtusUpload;
    rtusAddToUploadQueue(uploadUrl: string, file: File);
    rtusUploadAll();
}

export class UploadComponent extends React.Component<Props, any> {

    constructor(props, context) {
        super(props, context);

        this._addFileToQueue = this._addFileToQueue.bind(this);
        this._startUpload = this._startUpload.bind(this);
    }

    _addFileToQueue(event) {
        this.props.rtusAddToUploadQueue('http://localhost:3000', event.target.files);
    }

    _startUpload() {
        this.props.rtusUploadAll();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this._addFileToQueue} multiple />
                <button onClick={this._startUpload}>Upload</button>
                <table>
                    <tbody>
                        {
                            Object.keys(this.props.rtusUpload.queue).map(key => {
                                return <tr key={key}>
                                    <td>{this.props.rtusUpload.queue[key].fileMetadata.name}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}