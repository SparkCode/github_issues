import { componentSetup } from 'utils/componentTestingSetup';
import Link from './Link';

describe('<Link/>', () => {
  const defaultProps = {};
  const setup = propsOverrides => componentSetup(Link, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'active-link';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
});
