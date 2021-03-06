import sinon from 'sinon';
import { componentSetup } from 'utils/componentTestingSetup';
import IssueList from '../IssuesList';

describe('<IssuesList/>', () => {
  const defaultProps = {
    issues: [
      {
        id: 5,
        number: 10,
        title: 'problems with simulating events',
        createdAt: 'Sun Sep 10 2017 14:18:04 GMT+0400 (Russia TZ 3 Standard Time)',
        internalUrl: '/internalUrl/10',
      },
      {
        id: 2,
        number: 11,
        title: 'Fix sentence in "Injecting Custom Argument" in readme',
        createdAt: '2017-07-03T12:08:29Z',
        internalUrl: '/internalUrl/11',
      },
    ],
    onIssueTitleClick: sinon.spy(),
  };

  it('should render without crashing', () => {
    componentSetup(IssueList, defaultProps);
  });
});
