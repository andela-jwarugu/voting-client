import React from 'react';
import ReactDOM from 'react-dom';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';
import { Route, Router, hashHistory } from 'react-router';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', 'Blah'],
      tally: {Sunshine: 2}
    }
  }
});

const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path='/' component={VotingContainer} />
        <Route path='/results' component={ResultsContainer} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
)
