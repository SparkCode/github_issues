import sinon from 'sinon';
import { componentSetup } from 'utils/componentTestingSetup';
import Paging from '../Paging';

describe('<Paging/>', () => {
  const defaultProps = {
    pagesNumber: 5,
    currentPage: 0,
    maxVisiblePagesFromEachSide: 1,
  };

  beforeEach(() => {
    defaultProps.goToNewPage = sinon.spy();
    defaultProps.makePageUrlByNumber = sinon.spy();
  });

  const setup = propsOverrides => componentSetup(Paging, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });
});
