import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { appReducers } from '../reducers/app';
import activityReducers from '../reducers/todo';
import initialState from './initstate';
///redux-saga for demo task#2
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['app', 'activity'],
}

const activityConfig = {
    key: 'activity',
    storage,
}

const appConfig = {
    key: 'app',
    storage,
    blacklist: ['menu', 'services'],
}

const rootReducer = combineReducers({
    app: persistReducer(appConfig, appReducers),
    activity: persistReducer(activityConfig, activityReducers),
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);