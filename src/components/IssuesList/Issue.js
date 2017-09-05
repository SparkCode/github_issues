import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import "./Issue.css"
import {formatDate} from "../../utils";
import Link from "../Link";

class Issue extends PureComponent {
    onTitleClick = () => {
        const {id, onTitleClick} = this.props;
        onTitleClick(id);
    };

    render() {
        const {number, title, created_at} = this.props;
        const b = block("issues-list-element");
        const date = formatDate(created_at);
        return (
            <li className={b}>
                <Link className={b("title")()} onClick={this.onTitleClick}>
                    {title}
                </Link>
                <div className={b("body")}>
                    <div className={b("number")}>
                        {`#${number}`}
                    </div>
                    <div className={b("created_at")}>
                        {`opened on ${date}`}
                    </div>
                </div>
            </li>
        );
    }
}

Issue.propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    onTitleClick: PropTypes.func.isRequired
};
Issue.defaultProps = {};

export default Issue;


