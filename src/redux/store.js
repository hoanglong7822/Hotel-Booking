import { combineReducers, createStore } from 'redux';
import authReducer from './authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import checkOutReducer from './checkOutReducer';
const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  checkOut: checkOutReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(persistedReducer, ReactReduxDevTools);
export const persistor = persistStore(store);
