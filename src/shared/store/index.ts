import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import {
  forwardToRenderer,
  // triggerAlias,
  replayActionMain,
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer
} from 'electron-redux';
import contactsReducer from 'src/shared/store/contacts/reducer';

const rootReducer = combineReducers({
  contacts: contactsReducer
});

const middlewares = [thunk];

function makeStore(isMain: boolean) {
  let store;
  if (isMain) {
    /// in the main store
    store = createStore(
      rootReducer,
      // initialState as any, // optional
      applyMiddleware(
        // triggerAlias, // optional, see below
        ...middlewares,
        forwardToRenderer, // IMPORTANT! This goes last
      ),
    );

    replayActionMain(store);

  } else {
    /// in the renderer store
    const initialState = getInitialStateRenderer();

    let applyMw = applyMiddleware(
      forwardToMain, // IMPORTANT! This goes first
      ...middlewares,
    );

    if (process.env.NODE_ENV === "development") {
      // import('redux-devtools-extension')
      //   .then(({composeWithDevTools}) => {
      //     applyMw = composeWithDevTools(applyMw);
      //   })
      const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      store = createStore(rootReducer, initialState as any, composeEnhancers(applyMw))
    } else {
      store = createStore(
        rootReducer,
        initialState as any,
        applyMw,
      );
    }

    replayActionRenderer(store);
  }
  return store;
}

//////
export default makeStore;
