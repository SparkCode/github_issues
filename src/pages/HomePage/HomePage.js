import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Search from "../../containers/HomePage/Search";
import Paging from "../../containers/HomePage/Paging";
import block from "bem-cn";
import "./HomePage.css"
import StatusIssuesBar from "../../containers/HomePage/StatusIssuesBar";
import IssuesList from "../../containers/HomePage/IssuesList";

class HomePage extends PureComponent {
    componentDidMount() {
        const {fetchIssuesIfNeeded, validatedQuery} = this.props;
        fetchIssuesIfNeeded(validatedQuery);
    }

    componentWillReceiveProps(newProps) {
        const {fetchIssuesIfNeeded, validatedQuery} = newProps;
        fetchIssuesIfNeeded(validatedQuery);
    }

    render() {
        const {validatedQuery, shouldShowPaging} = this.props;
        const b = block("home-page");
        return (
            <div className={b}>
                <Search
                    className={b("search")()}
                    defaultRepoName={validatedQuery.repoName}
                    defaultUserName={validatedQuery.userName}
                    defaultIssuesCount={validatedQuery.issuesCount}/>
                <StatusIssuesBar className={b("status")()}/>
                <IssuesList
                    repoName={validatedQuery.repoName}
                    userName={validatedQuery.userName}/>
                {shouldShowPaging &&
                <Paging
                    currentPage={+validatedQuery.pageNumber}
                    repoName={validatedQuery.repoName}
                    userName={validatedQuery.userName}
                    issuesCount={validatedQuery.issuesCount}/>
                }
            </div>
        );
    }
}

HomePage.propTypes = {
    validatedQuery: PropTypes.object.isRequired,
    shouldShowPaging: PropTypes.bool.isRequired,
    fetchIssuesIfNeeded: PropTypes.func.isRequired
};
HomePage.defaultProps = {};

export default HomePage;
