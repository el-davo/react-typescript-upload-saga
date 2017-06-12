import {applyMiddleware, compose, createStore} from 'redux';
import * as reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import * as createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from '../root-reducer';
import {rootSaga} from '../root-saga';

const logger = createLogger({
  collapsed: true,
  level: 'debug'
});
const sagaMiddleware = createSagaMiddleware();

declare const window: any;
declare const module: any;

const enhancer = compose(
  applyMiddleware(reduxImmutableStateInvariant(), sagaMiddleware, logger),
  window.devToolsExtension ? window.devToolsExtension() : (noop) => noop
);

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../root-reducer', () =>
      store.replaceReducer(require('../root-reducer').default)
    );
  }

  return store;
}