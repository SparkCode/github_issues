import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn"
import "./IssueDetail.css"
import {formatDate} from "../../utils/index";
import Markdown from "../Markdown/Markdown";
import Link from "../Link";

class IssueDetail extends PureComponent {
    render() {
        const b = block("issue-detail");
        const {title, number, state, userLogin, created_at, body, issue_url, userUrl, userAvatarUrl} = this.props;
        const date = formatDate(created_at);
        return (
            <div className={b()}>
                <div className={b("top")}>
                    <div className={b("state", {state})}>{state}</div>
                    <h1 className={b("header")}>
                        <Link href={issue_url} target="_blank">{title}</Link>
                        <span className={b("number")}> #{number}</span>
                    </h1>
                </div>
                <img className={b("avatar")} src={userAvatarUrl} alt={`${userLogin}'s avatar`}/>
                <div className={b("body")}>
                    <div className={b("body-header")}>
                        <Link href={userUrl} target="_blank" className={b("user-login")()}>{userLogin}</Link>
                        <div className={b("created-at")}>{`commented on ${date}`}</div>
                    </div>
                    <Markdown className={b("description")()} text={body}/>
                </div>
            </div>
        );
    }
}

IssueDetail.propTypes = {
    title : PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    userLogin: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    issue_url: PropTypes.string.isRequired,
    userUrl: PropTypes.string.isRequired,
    userAvatarUrl: PropTypes.string.isRequired
};
IssueDetail.defaultProps = {};

export default IssueDetail;
