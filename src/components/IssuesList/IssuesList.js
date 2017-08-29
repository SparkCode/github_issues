import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Issue from "./Issue";
import block from "bem-cn";
import "./IssuesList.css"

class IssuesList extends PureComponent {
    render() {
        const {issues, shouldShowNoItemsMessageIfNeed, noItemsMessage} = this.props;
        const b = block("issues");
        return (
            <div className={b}>
                <div className={b("no-items-message")}>
                    {!issues.length && shouldShowNoItemsMessageIfNeed && noItemsMessage}

                </div>
                <ul className={b("list")}>
                    {issues.map(issue => <Issue key={issue.id} {...issue}/>)}
                </ul>
            </div>
        );
    }
}

IssuesList.propTypes = {
    issues: PropTypes.arrayOf(
        PropTypes.shape({id: PropTypes.number.isRequired})
    ).isRequired,
    noItemsMessage: PropTypes.string,
    shouldShowNoItemsMessageIfNeed: PropTypes.bool
};
IssuesList.defaultProps = {
    noItemsMessage: "There's nothing to show",
    shouldShowNoItemsMessageIfNeed: false
};

export default IssuesList;
