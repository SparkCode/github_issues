import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn"
import "./StatusIssuesBar.css"
import * as cn from "classnames"

class StatusIssuesBar extends PureComponent {
    render() {
        const {
            issuesBeReceived,
            issuesIsLoading,
            isRequestFailed,
            errorMessage,
            noIssuesBeLoaded,
            className} = this.props;

        const b = block("status-issues-bar");

        const status =
            isRequestFailed
                ? errorMessage : issuesBeReceived && noIssuesBeLoaded
                ? "No issues be found in this repository" : issuesIsLoading
                    ? "Data is loading..." : null;
        return (
            <div className={cn(className, b())}>
                {status}
            </div>
        );
    }
}

StatusIssuesBar.propTypes = {
    issuesBeReceived: PropTypes.bool.isRequired,
    issuesIsLoading: PropTypes.bool.isRequired,
    isRequestFailed: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    noIssuesBeLoaded: PropTypes.bool.isRequired,
    className: PropTypes.string
};
StatusIssuesBar.defaultProps = {};

export default StatusIssuesBar;
