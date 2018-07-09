import sinon from 'sinon';
import { componentSetup } from 'utils/componentTestingSetup';
import IssuesSearch from './IssuesSearch';

describe('<IssuesSearch/>', () => {
  const defaultProps = {
    issuesCountOptions: ['10', '20', '30'],
    userRepositories: ['firstRepo', 'secondRepo'],
  };

  beforeEach(() => {
    defaultProps.onSearch = sinon.spy();
    defaultProps.searchReposByUserName = sinon.spy();
  });

  const setup = propsOverrides => {
    const { wrapper, props } = componentSetup(IssuesSearch, defaultProps, propsOverrides);

    return {
      props,
      wrapper,
      repoName: wrapper.find('.search__repo-name'),
      userName: wrapper.find('.search__user-name'),
    };
  };

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'search-issues-class';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should call onSearch callback when form be submited', () => {
    const { wrapper, props } = setup();
    const state = {
      userName: 'name',
      repoName: 'repo',
      issuesCount: '10',
    };
    wrapper.setState(state);
    wrapper.simulate('submit', { preventDefault: sinon.spy() });
    expect(
      props.onSearch.calledOnce && props.onSearch.calledWithExactly(state.userName, state.repoName, state.issuesCount),
    ).toBeTruthy();
  });

  it('should call onSearch callback when repository is selected', () => {
    const { wrapper, props, repoName } = setup();
    const state = {
      userName: 'name',
      repoName: 'repo',
      issuesCount: '10',
    };
    wrapper.setState(state);
    const selectedRepo = 'newRepo';
    repoName.props().onOptionSelected(selectedRepo);
    expect(
      props.onSearch.calledOnce && props.onSearch.calledWithExactly(state.userName, selectedRepo, state.issuesCount),
    ).toBeTruthy();
  });

  it('should call searchReposByUserName callback on user name field blur', () => {
    const { userName, wrapper, props } = setup();
    const state = { userName: 'userName' };
    wrapper.setState(state);
    userName.props().onBlur();
    expect(
      props.searchReposByUserName.calledOnce &&
        props.searchReposByUserName.calledWithExactly(state.userName, undefined),
    ).toBeTruthy();
  });

  it('should call searchReposByUserName callback on repo name value change with 500 ms debounce', () => {
    const { wrapper, repoName, props } = setup();
    const state = { userName: 'gaearon' };
    wrapper.setState(state);
    const newRepoName = 'redux';
    repoName.props().onValueChange(newRepoName);

    setTimeout(() => {
      expect(
        props.searchReposByUserName.calledOnce &&
          props.searchReposByUserName.calledWithExactly(state.userName, newRepoName),
      ).toBeTruthy();
    }, 600);
  });
});
