import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Billions', 'Power'];

ReactDOM.render(
  <Voting pair={pair} winner='Billions' />,
  document.getElementById('app')
)
