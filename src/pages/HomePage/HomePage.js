import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Search from "../../containers/HomePage/Search";
import Paging from "../../containers/HomePage/Paging";
import IssuesList from "../../components/IssuesList";
import block from "bem-cn";
import "./HomePage.css"

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
        const {
            validatedQuery,
            shouldShowPaging,
            issues,
            issuesBeReceived,
            issuesIsLoading,
            isRequestFailed,
            errorMessage} = this.props;
        const b = block("home-page");
        const issuesListConfiguration =
            isRequestFailed ? {
                shouldShowNoItemsMessageIfNeed: true,
                noItemsMessage: errorMessage}
            : issuesBeReceived ? {
                shouldShowNoItemsMessageIfNeed: true,
                noItemsMessage: "No issues be found in this repository"}
            : issuesIsLoading ? {
                    shouldShowNoItemsMessageIfNeed: true,
                    noItemsMessage: "Data is loading..."} : {};

        return (
            <div className={b}>
                <Search className={b("search")()} query={validatedQuery}/>
                <IssuesList issues={issues} {...issuesListConfiguration}/>
                {shouldShowPaging && <Paging currentPage={+validatedQuery.pageNumber} query={validatedQuery}/>}
            </div>
        );
    }
}

HomePage.propTypes = {
    validatedQuery: PropTypes.object.isRequired,
    shouldShowPaging: PropTypes.bool.isRequired,
    fetchIssuesIfNeeded: PropTypes.func.isRequired,
    issuesBeReceived: PropTypes.bool.isRequired,
    issuesIsLoading: PropTypes.bool.isRequired,
    isRequestFailed: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    issues: PropTypes.array.isRequired
};
HomePage.defaultProps = {};

export default HomePage;
