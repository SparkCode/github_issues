import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import { debounce } from 'lodash';
import Input from 'components/Input';
import Button from 'components/Button';
import AutoComplete from 'components/Autocomplete';
import Select from 'components/Select';
import './IssuesSearch.scss';

class IssuesSearch extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultUserName, defaultRepoName, defaultIssuesCountOnPage } = this.props;
    this.state = {
      userName: defaultUserName,
      repoName: defaultRepoName,
      issuesCountOnPage: defaultIssuesCountOnPage,
    };
  }

  searchReposByUserName = (userName, repoName) => {
    if (!userName.length) {
      return;
    }
    const { searchReposByUserName } = this.props;
    searchReposByUserName(userName, repoName);
  };

  debouncedSearchReposByUserName = debounce(this.searchReposByUserName, 500);

  onValueChange = (propertyName, value) => this.setState({ [propertyName]: value });

  onChange = (value, name) => this.onValueChange(name, value);

  onRepoNameChange = value => {
    this.onValueChange('repoName', value);
    const { userName } = this.state;
    this.debouncedSearchReposByUserName(userName, value);
  };

  onRepoSelected = repoName => {
    const { onSearch } = this.props;
    const { userName, issuesCountOnPage } = this.state;
    onSearch(userName, repoName, issuesCountOnPage);
  };

  onSubmit = e => {
    e.preventDefault();
    const { onSearch } = this.props;
    const { userName, repoName, issuesCountOnPage } = this.state;
    onSearch(userName, repoName, issuesCountOnPage);
  };

  onUserNameFieldBlur = () => {
    const { userName } = this.state;
    this.searchReposByUserName(userName);
  };

  render() {
    const b = block('search');
    const { userName, repoName, issuesCountOnPage } = this.state;
    const { className, issuesCountOnPageOptions, userRepositories } = this.props;
    return (
      <form className={classnames(b(), className)} onSubmit={this.onSubmit}>
        <Input
          value={userName}
          name="userName"
          className={b('user-name')()}
          onValueChange={this.onChange}
          placeholder="User name"
          aria-label="User name"
          onBlur={this.onUserNameFieldBlur}
          required
        />
        <AutoComplete
          className={b('repo-name')()}
          name="repoName"
          autoComplete="off"
          value={repoName}
          options={userRepositories}
          onValueChange={this.onRepoNameChange}
          onOptionSelected={this.onRepoSelected}
          placeholder="Repository name"
          aria-label="Repository name"
          required
        />
        <Select
          className={b('select')()}
          name="issuesCountOnPage"
          aria-label="Issues count on page"
          value={issuesCountOnPage}
          options={issuesCountOnPageOptions}
          onValueChange={this.onChange}
        />
        <Button className={b('submit')()} type="submit">
          Search
        </Button>
      </form>
    );
  }
}

IssuesSearch.propTypes = {
  defaultUserName: PropTypes.string,
  defaultRepoName: PropTypes.string,
  defaultIssuesCountOnPage: PropTypes.string,
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  issuesCountOnPageOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchReposByUserName: PropTypes.func.isRequired,
  userRepositories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
IssuesSearch.defaultProps = {
  defaultRepoName: '',
  defaultUserName: '',
  defaultIssuesCountOnPage: '',
};

export default IssuesSearch;
