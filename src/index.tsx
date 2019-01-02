import { render } from 'react-dom'
import * as React from 'react'
import { Routes } from './routes'
import './index.css'
import './styles/styles.scss'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { Store } from './store/store'
import 'typeface-roboto'

render(
  <Provider store={Store}>
   {Routes}
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
