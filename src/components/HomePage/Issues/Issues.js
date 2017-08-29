import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Issue from "./Issue";
import block from "bem-cn";
import "./Issues.css"

class Issues extends PureComponent {
    componentDidMount() {
        const {fetchIssuesIfNeeded} = this.props;
        fetchIssuesIfNeeded();
    }

    componentWillReceiveProps(newProps) {
        const {fetchIssuesIfNeeded} = newProps;
        fetchIssuesIfNeeded();
    }

    render() {
        const {issues, issuesBeLoaded, noItemsMessage="There's nothing to show"} = this.props;
        const b = block("issues");
        if (!issues.length) {

        }
        return (
            <div className={b}>
                <div className={b("no-items-message")}>
                    {!issues.length && issuesBeLoaded && <div>{noItemsMessage}</div>}

                </div>
                <ul className={b("list")}>
                    {issues.map(issue => <Issue key={issue.id} {...issue}/>)}
                </ul>
            </div>
        );
    }
}

Issues.propTypes = {
    issues: PropTypes.arrayOf(
        PropTypes.shape({id: PropTypes.number.isRequired})
    ).isRequired,
    fetchIssuesIfNeeded: PropTypes.func.isRequired,
    issuesBeLoaded: PropTypes.bool.isRequired
};
Issues.defaultProps = {};

export default Issues;
