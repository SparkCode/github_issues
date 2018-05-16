import Link from './Link';
import React from 'react';
import { componentSetup } from 'utils/ComponentTest';
describe('<Link/>', () => {
  const defaultProps = {};
  const setup = (propsOverrides) =>
    componentSetup(Link, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'active-link';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
});
