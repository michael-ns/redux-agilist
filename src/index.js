import React from 'react'
import { render } from 'react-dom'
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux'
// import reducer from './reducers'
import Game from './components/Game'
import {reducer as notifications} from 'react-notification-system-redux';

function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      notifications
    }),
    initialState
  );
}

const store = configureStore();

window.appStore = store;

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
)
