import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

export default (rootReducer, rootSaga) => {
  const middlewares = []
  const enhancers = []

  const sagaMiddleware = createSagaMiddleware()
  middlewares.push(sagaMiddleware)
  enhancers.push(applyMiddleware(...middlewares))

  const composedEnhancers = compose(...enhancers)
  const store = createStore(rootReducer, composedEnhancers)
  
  sagaMiddleware.run(rootSaga)

  return store
}