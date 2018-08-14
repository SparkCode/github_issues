import sinon from 'sinon';
import { componentSetup } from 'utils/componentTestingSetup';
import Input from '../Input';

describe('<Input/>', () => {
  const defaultProps = { value: 'Bill' };

  beforeEach(() => {
    defaultProps.onValueChange = sinon.spy();
  });

  const setup = propsOverrides => componentSetup(Input, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'user-name-field';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should call onValueChange callback when input value is changed', () => {
    const { wrapper, props } = setup();
    const newValue = 'Billy';
    const name = 'inputName';
    wrapper.simulate('change', { target: { value: newValue, name } });
    expect(props.onValueChange.calledOnce && props.onValueChange.calledWithExactly(newValue, name)).toBeTruthy();
  });
});
