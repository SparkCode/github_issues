import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import {SearchIssues, StatusIssuesBar} from "../../containers/HomePage";
import "./HomePage.css"

class HomePage extends PureComponent {
    render() {
        const b = block("home-page");
        const {userName, repoName, issuesCount, children} = this.props;
        return (
            <div className={b()}>
                <SearchIssues className={b("search")()}
                              defaultUserName={userName}
                              defaultRepoName={repoName}
                              defaultIssuesCount={issuesCount}/>
                <StatusIssuesBar className={b("status")()}/>
                {children}
            </div>
        );
    }
}

HomePage.propTypes = {
    userName: PropTypes.string,
    repoName: PropTypes.string,
    children: PropTypes.element.isRequired,
    issuesCount: PropTypes.string.isRequired
};
HomePage.defaultProps = {};

export default HomePage;
