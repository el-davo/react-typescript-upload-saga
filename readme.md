## React-Typescript-Upload-Saga

### Install

With npm

```
npm install --save react-typescript-upload-saga
```

With yarn

```
yarn add react-typescript-upload-saga
```

### What does this do?

This is a file uploader which utilizes redux and redux-saga to upload files. This is written in typescript so you will not be able to use this libary if you arent using typescript :(

### Why Redux and Redux-Saga?

One of the core principles of redux is that it keeps state and view completely seperated. This uploader tries to hide as much logic as possible behind redux, allowing the developer to call a simple set of functions to tell the uploader what to do

Redux-Saga acts like a background process which is a perfect paradigm for uploading files. Handling control flow such as queues and progress monitoring is very simple with sagas.

### How does it work?

Normally you will have a root reducer. You can import the uploader reducer like below

```
import { combineReducers } from 'redux';
import { rtusReducer as rtusUpload } from 'react-typescript-upload-saga';

export const rootReducer = combineReducers({
    rtusUpload
});
```

You will also have a root saga file which is used to start your sagas

```
import { fork } from 'redux-saga/effects';
import { rtusSaga } from 'react-typescript-upload-saga';

export function* rootSaga() {
    yield [
        fork(rtusSaga)
    ];
}
```

Next you will use the uploader in a component like so

```
import { rtusRemoveAllFiles, RtusUpload, rtusUploadAll, UploadItem } from 'react-typescript-upload-saga';
import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import * as React from 'react';

interface Props {
    rtusUpload: RtusUpload;
    rtusAddToUploadQueue(uploadUrl: string, file: File);
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
        // Add a file to the queue
        this.props.rtusAddToUploadQueue('http://localhost:3001/upload', event.target.files);
    }

    _startUpload() {
        // Begin uploading all files
        this.props.rtusUploadAll();
    }

    _removeAllFiles() {
        // Removes all files from the queue
        this.props.rtusRemoveAllFiles();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this._addFileToQueue} multiple />
                <button onClick={this._startUpload}>Upload</button>
                <button onClick={this._removeAllFiles}>Remove All</button>
                <div>
                    <List>
                        { // This is how we list the queue
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
                </div>
            </div>
        );
    }
}
```

And finally we need a container for our component to wire in the redux state and rtus functions

```
import { RtusUpload, rtusUploadAll, rtusAddToUploadQueue, rtusRemoveAllFiles } from 'react-typescript-upload-saga';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UploadComponent } from './upload.component';

interface Props {
    rtusUpload: RtusUpload;
    actions: Actions;
}

interface Actions {
    rtusAddToUploadQueue(uploadUrl: string, file: File);
    rtusUploadAll();
    rtusRemoveAllFiles();
}

const UploadContainer: React.StatelessComponent<Props> = props => {
    return (
        <UploadComponent
            rtusUpload={props.rtusUpload}
            rtusAddToUploadQueue={props.actions.rtusAddToUploadQueue}
            rtusUploadAll={props.actions.rtusUploadAll}
            rtusRemoveAllFiles={props.actions.rtusRemoveAllFiles} />
    );
};

function mapStateToProps(state, ownProps) {
    return {
        rtusUpload: state.rtusUpload
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ rtusAddToUploadQueue, rtusUploadAll, rtusRemoveAllFiles }, dispatch)
    };
}

export default connect<any, {}, any>(
    mapStateToProps,
    mapDispatchToProps
)(UploadContainer);
```