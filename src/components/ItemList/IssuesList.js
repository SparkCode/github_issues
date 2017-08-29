import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import ItemList from "./ItemList";
import {Issue} from "./../ListItem";

class IssuesList extends PureComponent {
    render() {
        const b = block("issues-list");
        const {issues} = this.props;
        return (
            <div className={b()}>
                <ItemList>
                    {issues.map(issue => <Issue key={issue.id} {...issue}/>)}
                </ItemList>
            </div>
        );
    }
}

IssuesList.propTypes = {
    issues: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })).isRequired
};
IssuesList.defaultProps = {};

export default IssuesList;
