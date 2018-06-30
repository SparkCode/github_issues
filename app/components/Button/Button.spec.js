import Button from './Button';
import React from 'react';
import { componentSetup } from 'utils/ComponentTest';

describe('<Button/>', () => {
  const setup = propsOverrides => componentSetup(Button, {}, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'big-button';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
});
