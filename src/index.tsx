import { render } from 'react-dom'
import * as React from 'react'
import { Routes } from './routes'
import './index.css'
import './styles/styles.scss'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './reducers/reducers'
import { ApplicationContainer } from './App'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
   {Routes}
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
