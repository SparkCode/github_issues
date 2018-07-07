import sinon from 'sinon';
import { componentSetup } from 'utils/ComponentTest';
import Select from './Select';

describe('<Select/>', () => {
  const defaultProps = {
    options: ['option1', 'option2', 'option3'],
    value: 'option1',
  };

  beforeEach(() => {
    defaultProps.onValueChange = sinon.spy();
  });

  const setup = propsOverrides => componentSetup(Select, defaultProps, propsOverrides);

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'search-issues-class';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should call onValueChange callback when value is selected', () => {
    const { wrapper, props } = setup();
    const newValue = props.options[2];
    const name = 'inputName';
    wrapper.simulate('change', { target: { value: newValue, name } });
    expect(props.onValueChange.calledOnce && props.onValueChange.calledWithExactly(newValue, name)).toBeTruthy();
  });
});
