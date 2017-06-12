import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rtusActions, UploadItem } from '../../main';
import { UploadComponent } from './upload.component';
import { RtusUpload } from '../../main';

interface Props {
    rtusUpload: RtusUpload;
    actions: Actions;
}

interface Actions {
    rtusAddToUploadQueue(uploadUrl: string, file: File);
}

const UploadContainer: React.StatelessComponent<Props> = props => {
    return (
        <UploadComponent rtusUpload={props.rtusUpload} rtusAddToUploadQueue={props.actions.rtusAddToUploadQueue} />
    );
};

function mapStateToProps(state, ownProps) {
    return {
        rtusUpload: state.rtusUpload
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...rtusActions }, dispatch)
    };
}

export default connect<any, {}, any>(
    mapStateToProps,
    mapDispatchToProps
)(UploadContainer);
