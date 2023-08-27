import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

/**
 * Configuration object for persisting data using redux-persist.
 * @type {Object}
 * @property {string} key - The key to use for storing the data in the storage.
 * @property {Object} storage - The storage engine to use for persisting the data.
 * @property {Array<string>} whitelist - The list of reducers to persist.
 */
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

/**
 * Combines multiple reducers into a single root reducer.
 * @param {Object} reducers - An object containing the individual reducers.
 * @returns The root reducer that combines all the individual reducers.
 */
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

/**
 * Wraps the root reducer with the persist reducer to enable state persistence.
 * @param {PersistConfig} persistConfig - The configuration object for state persistence.
 * @param {RootReducer} rootReducer - The root reducer function.
 * @returns The wrapped root reducer with state persistence.
 */
export default persistReducer(persistConfig, rootReducer);