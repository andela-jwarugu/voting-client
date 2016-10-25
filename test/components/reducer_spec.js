import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Billions', 'Power'),
          tally: Map({Billions: 4})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 4}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Billions', 'Power'],
          tally: {'Billions': 4}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 4}
      }
    }));
  });

  it('handles SET_STATE without initialState', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Billions', 'Power'],
          tally: {Billions: 4}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 4}
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 3}
      }
    });
    const action = {type: 'VOTE', entry: 'Billions'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 3}
      },
      hasVoted: 'Billions'
    }))
  })

  it('doesnt set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 3}
      }
    });
    const action = {type: 'VOTE', entry: 'Sunshine'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 3}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Billions', 'Power'],
        tally: {Billions: 3}
      },
      hasVoted: 'Billions'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Sunshine', 'The Help']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sunshine', 'The Help']
      }
    }));
  });
});
