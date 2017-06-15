import { CUSTOM_UPLOAD_COMPLETE } from './upload.action-types';
import { rtusRemoveAllFiles, RtusUpload, rtusUploadAll, UploadItem } from '../../index';
import { Card, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import * as React from 'react';

interface Props {
    rtusUpload: RtusUpload;
    rtusAddToUploadQueue(uploadUrl: string, file: File, customCompleteAction: string);
    rtusUploadAll();
    rtusRemoveAllFiles();
}

export class UploadComponent extends React.Component<Props, any> {

    constructor(props, context) {
        super(props, context);

        this._addFileToQueue = this._addFileToQueue.bind(this);
        this._startUpload = this._startUpload.bind(this);
        this._removeAllFiles = this._removeAllFiles.bind(this);
    }

    _addFileToQueue(event) {
        this.props.rtusAddToUploadQueue('http://localhost:3001/upload', event.target.files, CUSTOM_UPLOAD_COMPLETE);
    }

    _startUpload() {
        this.props.rtusUploadAll();
    }

    _removeAllFiles() {
        this.props.rtusRemoveAllFiles();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this._addFileToQueue} multiple />
                <button onClick={this._startUpload}>Upload</button>
                <button onClick={this._removeAllFiles}>Remove All</button>
                <br />
                <br />
                <Card>
                    <CardText>
                        <List>
                            {
                                Object.keys(this.props.rtusUpload.queue).map(key => {
                                    return <ListItem
                                        key={key}
                                        primaryText={this.props.rtusUpload.queue[key].fileMetadata.name}
                                        secondaryText={<LinearProgress
                                            mode="determinate"
                                            style={{ height: 5 }}
                                            value={this.props.rtusUpload.queue[key].progress} />} />
                                })
                            }
                        </List>
                    </CardText>
                </Card>
            </div>
        );
    }
}