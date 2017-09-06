import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn'
import * as cn from "classnames"
import Input from "../Input";
import Button from "../Button";
import AutoComplete from "../Autocomplete";
import Select from "../Select";
import {debounce} from "lodash";
import "./SearchIssues.css"

class SearchIssues extends PureComponent {
    constructor(props) {
        super(props);
        const {defaultUserName, defaultRepoName, defaultIssuesCount} = this.props;
        this.state = {userName: defaultUserName,
                     repoName: defaultRepoName,
                     issuesCount: defaultIssuesCount};
    }

    _searchReposByUserName = (userName, repoName) => {
        if (!userName.length)
            return;
        const {searchReposByUserName} = this.props;
        searchReposByUserName(userName, repoName);
    };


    _debouncedSearchReposByUserName = debounce(this._searchReposByUserName, 500);

    onValueChange = (propertyName, value) => {
        this.setState({[propertyName]: value});

    };

    onUserNameChange = (value) => this.onValueChange("userName", value);

    onRepoNameChange = (value) => {
        this.onValueChange("repoName", value);
        const {userName} = this.state;
        this._debouncedSearchReposByUserName(userName, value);
    };

    onIssueCountChange = (value) => this.onValueChange("issuesCount", value);

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
        this._searchReposByUserName(userName);
    };

    render() {
        const b = block("search");
        const {userName, repoName, issuesCount} = this.state;
        const {className, issuesCountOptions, userRepositories} = this.props;
        return (
            <form className={cn(b(), className)} onSubmit={this.onSubmit}>
                <Input
                    value={userName}
                    className={b("user-name")()}
                    onValueChange={this.onUserNameChange}
                    placeholder="User name"
                    onBlur={this.onUserNameFieldBlur}
                    required/>
                <AutoComplete
                    className={b("repo-name")()}
                    value={repoName}
                    options={userRepositories}
                    onValueChange={this.onRepoNameChange}
                    onOptionClicked={this.onRepoSelected}
                    placeholder="Repository name"
                    required/>
                <Select
                    className={b("select")()}
                    value={issuesCount.toString()}
                    options={issuesCountOptions}
                    onValueChange={this.onIssueCountChange}/>
                <Button className={b("submit")()} type="submit">Search</Button>
            </form>
        );
    }
}

SearchIssues.propTypes = {
    defaultUserName: PropTypes.string,
    defaultRepoName: PropTypes.string,
    defaultIssuesCount: PropTypes.string,
    className: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    issuesCountOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchReposByUserName: PropTypes.func.isRequired,
    userRepositories: PropTypes.arrayOf(PropTypes.string).isRequired
};
SearchIssues.defaultProps = {
    defaultRepoName: "",
    defaultUserName: "",
    defaultIssuesCount: ""
};

export default SearchIssues;
