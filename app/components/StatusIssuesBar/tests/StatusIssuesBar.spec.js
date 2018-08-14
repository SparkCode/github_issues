import { componentSetup } from 'utils/componentTestingSetup';
import StatusIssuesBar from '../StatusIssuesBar';

describe('<StatusIssuesBar/>', () => {
  const defaultProps = {
    issuesIsLoading: false,
    isRequestFailed: false,
    noIssuesReceived: false,
  };

  const setup = propsOverrides => componentSetup(StatusIssuesBar, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'search-issues-class';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should render errorMessage when isRequestFailed is true', () => {
    const { wrapper, props } = setup({
      isRequestFailed: true,
      errorMessage: 'message',
    });
    expect(wrapper.children().contains(props.errorMessage)).toBeTruthy();
  });

  it('should render noIssuesBeReceivedMessage when no issues is received without request error', () => {
    const { props, wrapper } = setup({
      isRequestFailed: false,
      noIssuesReceived: true,
      noIssuesBeReceivedMessage: 'message',
    });
    expect(wrapper.children().contains(props.noIssuesBeReceivedMessage)).toBeTruthy();
  });

  it('should render issuesIsLoadingMessage when issues is loading', () => {
    const { props, wrapper } = setup({
      isRequestFailed: false,
      issuesBeReceived: false,
      issuesIsLoading: true,
      issuesIsLoadingMessage: 'message',
    });
    expect(wrapper.children().contains(props.issuesIsLoadingMessage)).toBeTruthy();
  });
});
