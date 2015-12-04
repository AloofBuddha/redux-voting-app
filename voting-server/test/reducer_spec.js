import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
	it('handles SET_ENTRIES', () => {
    const state = Map();

    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(state, action);

    const expectedState = fromJS({
    	entries: ['Trainspotting']
    });

    expect(nextState).to.equal(expectedState);
	
	});

	it('handles NEXT', () => {
    const state = fromJS({
    	 entries: ['Trainspotting', '28 Days Later']
    });

    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);

    const expectedState = fromJS({
    	vote: {
    		pair: ['Trainspotting', '28 Days Later']
    	},
    	entries: []
    });

    expect(nextState).to.equal(expectedState);
	
	});

	it('handles VOTE', () => {
    const state = fromJS({
    	vote: {
    		pair: ['Trainspotting', '28 Days Later']
    	},
    	entries: []
    });

    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);

    const expectedState = fromJS({
    	vote: {
    		pair: ['Trainspotting', '28 Days Later'],
    		tally: {
    			'Trainspotting': 1
    		}
    	},
    	entries: []
    });

    expect(nextState).to.equal(expectedState);
	
	});

  it('has an initial state', () => {
  	const state = undefined;

    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(state, action);

    const expectedState = fromJS({
    	entries: ['Trainspotting']
    });

    expect(nextState).to.equal(expectedState);
  
  });

  it('can be used with reduce', () => {
  	const state = Map();

	  const actions = [
	    {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
	    {type: 'NEXT'},
	    {type: 'VOTE', entry: 'Trainspotting'},
	    {type: 'VOTE', entry: '28 Days Later'},
	    {type: 'VOTE', entry: 'Trainspotting'},
	    {type: 'NEXT'}
	  ];
	  const finalState = actions.reduce(reducer, state);

	  const expectedState = fromJS({
	  	winner: 'Trainspotting'
	  });

	  expect(finalState).to.equal(expectedState);

	});

});