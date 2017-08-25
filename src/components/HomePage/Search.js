import React, {Component} from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn'
import {FormControl} from "./Input";
import Button from "./Button";
import {FormSelect} from "./Select";
import DropDownList from "./DropDownList";

class Search extends Component {
    constructor(props) {
        super(props);
        const {defaultUserName, defaultRepoName, defaultIssuesCount} = this.props;
        this.state = {userName: defaultUserName,
                     repoName: defaultRepoName,
                     issuesCount: defaultIssuesCount};
    }

    onValueChange = (propertyName) => (value) => {
        this.setState({[propertyName]: value});
        const {userName} = this.state;
        if (propertyName === "repoName") {
            const {loadReposByUserName} = this.props;
            loadReposByUserName(userName, value);
        }
    };

    onRepoSelected = (repoName) => {
        const {onSearch} = this.props;
        const {userName, issuesCount} = this.state;
        onSearch(userName, repoName, issuesCount);
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {onSearch} = this.props;
        const {userName, repoName, issuesCount} = this.state;
        onSearch(userName, repoName, issuesCount);
    };

    onUserNameFieldBlur = () => {
        const {userName} = this.state;
        const {loadReposByUserName} = this.props;
        loadReposByUserName(userName);
    };

    render() {
        const b = block("search");
        const {userName, repoName, issuesCount} = this.state;
        const {className, issuesCountOptions, userRepositories} = this.props;

        const mix = className ? className.mix(b) : b;
        return (
            <form className={mix} onSubmit={this.onSubmit}>
                <FormControl
                    value={userName}
                    className={b("user-name")}
                    onValueChange={this.onValueChange("userName")}
                    placeholder="User name"
                    onBlur={this.onUserNameFieldBlur}
                    required/>
                <DropDownList
                    className={b("repo-name")}
                    value={repoName}
                    options={userRepositories}
                    onValueChange={this.onValueChange("repoName")}
                    onOptionClicked={this.onRepoSelected}
                    placeholder="Repository name"
                    required/>
                <FormSelect
                    className={b("select")}
                    value={issuesCount.toString()}
                    options={issuesCountOptions}
                    onValueChange={this.onValueChange("issuesCount")}/>
                <Button className={b("submit")} type="submit">Search</Button>
            </form>
        );
    }
}

Search.propTypes = {
    defaultUserName: PropTypes.string,
    defaultRepoName: PropTypes.string,
    defaultIssuesCount: PropTypes.string,
    className: PropTypes.func,
    onSearch: PropTypes.func.isRequired,
    issuesCountOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    loadReposByUserName: PropTypes.func.isRequired,
    userRepositories: PropTypes.arrayOf(PropTypes.string).isRequired
};
Search.defaultProps = {
    defaultRepoName: "",
    defaultUserName: "",
    defaultIssuesCount: ""
};

export default Search;
