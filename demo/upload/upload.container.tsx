import { RtusUpload, rtusUploadAll, rtusAddToUploadQueue } from '../../main';
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
    rtusUploadAll()
}

const UploadContainer: React.StatelessComponent<Props> = props => {
    return (
        <UploadComponent
            rtusUpload={props.rtusUpload}
            rtusAddToUploadQueue={props.actions.rtusAddToUploadQueue}
            rtusUploadAll={props.actions.rtusUploadAll} />
    );
};

function mapStateToProps(state, ownProps) {
    return {
        rtusUpload: state.rtusUpload
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ rtusAddToUploadQueue, rtusUploadAll }, dispatch)
    };
}

export default connect<any, {}, any>(
    mapStateToProps,
    mapDispatchToProps
)(UploadContainer);
