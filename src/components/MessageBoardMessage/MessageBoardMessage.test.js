import React from 'react';
import ReactDOM from 'react-dom'
import MessageBoardMessage from './MessageBoardMessage';
import { BrowserRouter } from 'react-router-dom';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MessageBoardMessage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
