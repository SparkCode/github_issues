import React from 'react';
import sinon from 'sinon';
import Autocomplete from './Autocomplete';
import KeyCodes from 'utils/keyCodes';
import OptionsList from './OptionsList';
import { componentSetup } from 'utils/ComponentTest';

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
    const { input, props } = setup();
    input.props().onValueChange(value);
    const onValueChange = props.onValueChange;
    expect(onValueChange.calledOnce && onValueChange.calledWithExactly(value)).toBeTruthy();
  });

  it('should call onValueChange & onOptionSelected with value arg when option is selected by keyboard', () => {
    const { wrapper, input, props } = setup();

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

    const onValueChange = props.onValueChange;
    const onOptionSelected = props.onOptionSelected;
    expect(
      onValueChange.calledOnce &&
        onOptionSelected.calledOnce &&
        onValueChange.calledWithExactly(props.options[1]) &&
        onOptionSelected.calledWithExactly(props.options[1]),
    ).toBeTruthy();
  });

  it('should call onValueChange & onOptionSelected with value arg when option is selected by mouse', () => {
    const { optionsList, input, props } = setup();
    optionsList.props().onOptionHover(2);
    input.props().onBlur();

    const onValueChange = props.onValueChange;
    const onOptionSelected = props.onOptionSelected;

    expect(
      onValueChange.calledOnce &&
        onOptionSelected.calledOnce &&
        onValueChange.calledWithExactly(props.options[2]) &&
        onOptionSelected.calledWithExactly(props.options[2]),
    ).toBeTruthy();
  });
});
