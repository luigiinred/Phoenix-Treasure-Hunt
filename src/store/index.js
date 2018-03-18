import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import auth from "./auth";
import sites from "./sites";
import answers from "./answers";
import settings from "./settings";

const sagaMiddleware = createSagaMiddleware();

const config = {
  key: "root",
  storage
};

const persistantReducer = persistCombineReducers(config, {
  auth: auth.reducer,
  sites: sites.reducer,
  answers: answers.reducer,
  settings: settings.reducer
});

const middleware = [thunk, sagaMiddleware];

function configureStore(initialState) {
  const store = createStore(
    persistantReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(auth.saga);
  sagaMiddleware.run(sites.saga);
  sagaMiddleware.run(answers.saga);
  sagaMiddleware.run(settings.saga);

  return { store, persistor };
}

const { store, persistor } = configureStore();

export { store, persistor };
