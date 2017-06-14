import { RtusUpload, rtusUploadAll, rtusAddToUploadQueue, rtusRemoveAllFiles } from '../../main';
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
