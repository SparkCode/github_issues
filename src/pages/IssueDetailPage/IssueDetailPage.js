import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import {IssueDetail} from "../../containers/IssueDetailPage";

class IssueDetailPage extends PureComponent {
    componentDidMount() {
        const {fetchIssueIfNeeded} = this.props;
        fetchIssueIfNeeded();
    }

    componentWillReceiveProps() {
        const {fetchIssueIfNeeded} = this.props;
        fetchIssueIfNeeded();
    }

    render() {
        const {issueBeLoaded, issueNumber} = this.props;
        const b = block("issue-page");
        return (
            <div className={b()}>
                {issueBeLoaded && <IssueDetail issueNumber={+issueNumber}/>}
            </div>
        );
    }
}

IssueDetailPage.propTypes = {
    fetchIssueIfNeeded: PropTypes.func.isRequired,
    issueNumber: PropTypes.string,
    issueBeLoaded: PropTypes.bool.isRequired
};
IssueDetailPage.defaultProps = {};

export default IssueDetailPage;
