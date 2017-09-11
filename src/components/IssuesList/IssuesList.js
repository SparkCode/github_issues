import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Issue from "./Issue";
import block from "bem-cn";
import "./IssuesList.css"

class IssuesList extends PureComponent {
    render() {
        const {issues, onIssueTitleClick} = this.props;
        const b = block("issues-list");
        return (
            <div className={b}>
                <ul className={b("list")}>
                    {issues.map(issue => <Issue key={issue.id} {...issue} onTitleClick={onIssueTitleClick}/>)}
                </ul>
            </div>
        );
    }
}

IssuesList.propTypes = {
    issues: PropTypes.arrayOf(
        PropTypes.shape({id: PropTypes.number.isRequired})
    ).isRequired,
    onIssueTitleClick: PropTypes.func.isRequired
};

export default IssuesList;
