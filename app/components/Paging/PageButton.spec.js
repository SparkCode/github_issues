import sinon from 'sinon';
import { componentSetup } from 'utils/componentTestingSetup';
import PageButton from './PageButton';

describe('<PageButton/>', () => {
  const defaultProps = {
    value: '10',
  };

  beforeEach(() => {
    defaultProps.goToNewPage = sinon.spy();
  });

  const setup = propsOverrides => componentSetup(PageButton, defaultProps, propsOverrides);

  it('should render without crashes', () => {
    setup();
  });

  it('should render with class, when class is provided', () => {
    const className = 'page-button-class';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should call goToNewPage callback with value arg when button be clicked', () => {
    const { props, wrapper } = setup();
    wrapper.simulate('click');
    expect(props.goToNewPage.calledOnce && props.goToNewPage.calledWithExactly(props.value)).toBeTruthy();
  });
});
