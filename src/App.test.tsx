import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApplicationContainer } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApplicationContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
