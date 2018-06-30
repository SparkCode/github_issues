import React from 'react';
import Markdown from './Markdown';
import { componentSetup } from 'utils/ComponentTest';

describe('<Markdown/>', () => {
  const defaultProps = {
    text: 'Just a minor sentence fix in the readme',
  };

  const setup = propsOverrides => componentSetup(Markdown, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'class';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
});
