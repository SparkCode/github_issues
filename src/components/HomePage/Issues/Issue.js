import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import "./Issue.css"

class Issue extends PureComponent {
    render() {
        const {number, title, created_at} = this.props;
        const b = block("issue");
        const options = {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'};
        const date = new Date(created_at);
        return (
            <li className={b}>
                <div className={b("title")}>
                    {title}
                </div>
                <div className={b("body")}>
                    <div className={b("number")}>
                        {`#${number}`}
                    </div>
                    <div className={b("created_at")}>
                        {`opened on ${date.toLocaleDateString("en-US", options)}`}
                    </div>
                </div>
            </li>
        );
    }
}

Issue.propTypes = {
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
};
Issue.defaultProps = {};

export default Issue;


