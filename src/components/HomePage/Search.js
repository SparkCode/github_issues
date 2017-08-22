import React, {Component} from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn'
import FormControl from "./FormControl";
import Button from "./Button";

class Search extends Component {
    constructor(props) {
        super(props);
        const {defaultUserName, defaultRepoName} = this.props;
        this.state = {userName: defaultUserName || "", repoName: defaultRepoName || ""};
    }

    onType = (propertyName) => (e) => {
        const value = e.target.value;
        this.setState({[propertyName]: value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {onSearch} = this.props;
        const {userName, repoName} = this.state;
        onSearch(userName, repoName);
    };

    render() {
        const b = block("search");
        const {userName, repoName} = this.state;
        const {className} = this.props;
        return (
            <form className={className.mix(b)} onSubmit={this.onSubmit}>
                <FormControl value={userName}
                       className={b("user-name")}
                       onChange={this.onType("userName")}
                       placeholder="User name"
                       required/>
                <FormControl value={repoName}
                       className={b("repo-name")}
                       onChange={this.onType("repoName")}
                       placeholder="Repository name"
                       required/>
                <Button className={b("submit")} type="submit">Search</Button>
            </form>
        );
    }
}

Search.propTypes = {
    defaultUserName: PropTypes.string,
    defaultRepoName: PropTypes.string,
    onSearch: PropTypes.func.isRequired
};
Search.defaultProps = {};

export default Search;
