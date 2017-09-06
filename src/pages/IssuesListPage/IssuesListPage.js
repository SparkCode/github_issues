import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Paging, IssuesList} from "../../containers/IssuesListPage";
import block from "bem-cn";

class HomePage extends PureComponent {
    componentDidMount() {
        this._fetchIssuesIfNeeded(this.props)
    }

    componentWillReceiveProps(newProps) {
        this._fetchIssuesIfNeeded(newProps)
    }

    _fetchIssuesIfNeeded(props) {
        const {fetchIssuesIfNeeded, issuesCount, pageNumber, repoName, userName} = props;
        fetchIssuesIfNeeded({issuesCount, pageNumber, repoName, userName});
    }

    render() {
        const {issuesCount, pageNumber, shouldShowPaging, repoName, userName} = this.props;
        const b = block("issues-list-page");
        return (
            <div className={b}>
                <IssuesList
                    repoName={repoName}
                    userName={userName}/>
                {shouldShowPaging &&
                <Paging
                    repoName={repoName}
                    userName={userName}
                    currentPage={+pageNumber}
                    issuesCount={issuesCount}/>
                }
            </div>
        );
    }
}

HomePage.propTypes = {
    shouldShowPaging: PropTypes.bool.isRequired,
    fetchIssuesIfNeeded: PropTypes.func.isRequired,
    issuesCount: PropTypes.string.isRequired,
    repoName: PropTypes.string,
    userName: PropTypes.string
};
HomePage.defaultProps = {};

export default HomePage;
