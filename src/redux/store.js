import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

/**
 * Creates a Redux store with the specified middlewares.
 * @param {Function} rootReducer - The root reducer function for the store.
 * @returns The created Redux store.
 */
const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

/**
 * Creates a persistor object that allows the Redux store to persist its state.
 * @param {Object} store - The Redux store object.
 * @returns {Object} - The persistor object.
 */
export const persistor = persistStore(store);

export default { store, persistor };