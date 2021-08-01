import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import mrApp from '../reducers';
import storage from 'redux-persist/lib/storage';

const persingConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persingConfig, mrApp);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

let persistor = persistStore(store);

export {
    persistor,
    store
};