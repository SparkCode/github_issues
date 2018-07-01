import sinon from 'sinon';
import { componentSetup } from 'utils/ComponentTest';
import KeyCodes from 'utils/keyCodes';
import Autocomplete from './Autocomplete';
import OptionsList from './OptionsList';

describe('<Autocomplete/>', () => {
  const defaultProps = {
    options: ['Elena', 'Jully', 'Alex'],
  };

  beforeEach(() => {
    defaultProps.onValueChange = sinon.spy();
    defaultProps.onOptionSelected = sinon.spy();
  });

  const setup = propsOverrides => {
    const { wrapper, props } = componentSetup(Autocomplete, defaultProps, propsOverrides);
    return {
      wrapper,
      props,
      input: wrapper.children().findWhere(x => x.props().className === 'autocomplete__control'),
      optionsList: wrapper.find(OptionsList),
    };
  };

  it('should render without crashing', () => {
    setup();
  });

  it('should render with class', () => {
    const className = 'user-name-field';
    const { wrapper } = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });

  it('should call onValueChange callback with value arg when input value is changed', () => {
    const value = 'Alex';
    const {
      input,
      props: { onValueChange },
    } = setup();
    input.props().onValueChange(value);
    expect(onValueChange.calledOnce && onValueChange.calledWithExactly(value)).toBeTruthy();
  });

  it('should call onValueChange & onOptionSelected with value arg when option is selected by keyboard', () => {
    const {
      wrapper,
      input,
      props: { onValueChange, onOptionSelected, options },
    } = setup();

    input.props().inputRef({ blur: sinon.spy() });
    wrapper.simulate('keydown', {
      keyCode: KeyCodes.bottom,
      preventDefault: sinon.spy(),
    });
    wrapper.simulate('keydown', {
      keyCode: KeyCodes.bottom,
      preventDefault: sinon.spy(),
    });
    wrapper.simulate('keydown', {
      keyCode: KeyCodes.enter,
      preventDefault: sinon.spy(),
    });
    expect(
      onValueChange.calledOnce &&
        onOptionSelected.calledOnce &&
        onValueChange.calledWithExactly(options[1]) &&
        onOptionSelected.calledWithExactly(options[1]),
    ).toBeTruthy();
  });

  it('should call onValueChange & onOptionSelected with value arg when option is selected by mouse', () => {
    const {
      optionsList,
      input,
      props: { onValueChange, onOptionSelected, options },
    } = setup();
    optionsList.props().onOptionHover(2);
    input.props().onBlur();

    expect(
      onValueChange.calledOnce &&
        onOptionSelected.calledOnce &&
        onValueChange.calledWithExactly(options[2]) &&
        onOptionSelected.calledWithExactly(options[2]),
    ).toBeTruthy();
  });
});
