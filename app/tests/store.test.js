/**
 * Test store addons
 */

import configureStore from '../configureStore';

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});
