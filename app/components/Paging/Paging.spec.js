import sinon from 'sinon';
import React from 'react';
import Paging from './Paging';
import { componentSetup } from 'utils/ComponentTest';

describe('<Paging/>', () => {
  const defaultProps = {
    pagesNumber: 5,
    currentPage: 0,
    maxVisiblePagesFromEachSide: 1,
  };

  beforeEach(() => {
    defaultProps.gotoNewPage = sinon.spy();
  });

  const setup = (propsOverrides) =>
    componentSetup(Paging, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });
});
