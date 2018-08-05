import sinon from 'sinon';
import { componentSetup } from 'utils/componentTestingSetup';
import Issue from './Issue';

describe('<Issue/>', () => {
  const defaultProps = {
    id: 5,
    number: 10,
    title: 'problems with simulating events',
    createdAt: 'Sun Sep 10 2017 14:18:04 GMT+0400 (Russia TZ 3 Standard Time)',
    internalUrl: '/internalUrl/11',
  };

  beforeEach(() => {
    defaultProps.onTitleClick = sinon.spy();
  });

  const setup = propsOverrides => {
    const { wrapper, props } = componentSetup(Issue, defaultProps, propsOverrides);

    return {
      wrapper,
      props,
      title: wrapper.find('.issues-list-element__title'),
    };
  };

  it('should render without crashing', () => {
    setup();
  });

  it('should call onTitleClick callback with issue id arg when click event fire for title element', () => {
    const { title, props } = setup();
    title.simulate('click', { preventDefault() {} });
    expect(props.onTitleClick.calledOnce && props.onTitleClick.calledWithExactly(props.number)).toBeTruthy();
  });
});
