import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Issue from "./Issue";
import block from "bem-cn";

class Issues extends Component {
    componentDidMount() {
        const {fetchIssuesIfNeeded} = this.props;
        fetchIssuesIfNeeded();
    }

    componentWillReceiveProps(newProps) {
        const {fetchIssuesIfNeeded} = newProps;
        fetchIssuesIfNeeded();
    }

    render() {
        const {issues} = this.props;
        const b = block("issues");
        return (
            <ul className={b}>
                {issues.map(issue => <Issue key={issue.id} {...issue}/>)}
            </ul>
        );
    }
}

Issues.propTypes = {
    issues: PropTypes.arrayOf(
        PropTypes.shape({id: PropTypes.number.isRequired})
    ).isRequired,
    fetchIssuesIfNeeded: PropTypes.func.isRequired
};
Issues.defaultProps = {};

export default Issues;
