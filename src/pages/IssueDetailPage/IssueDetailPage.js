import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import "./IssueDetailPage.css"
import IssueDetail from "../../containers/IssueDetailPage/IssueDetail";
import StatusIssuesBar from "../../containers/IssueDetailPage/StatusIssuesBar";
import Search from "../../containers/IssueDetailPage/Search";

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
        const {issueBeLoaded, issueNumber, userName, repoName} = this.props;
        const b = block("issue-page");
        const content = issueBeLoaded ?
            <IssueDetail issueNumber={+issueNumber}/> :
            <StatusIssuesBar className={b("status")()}/>;
        return (
            <div className={b()}>
                <Search defaultUserName={userName} defaultRepoName={repoName}/>
                {content}
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
