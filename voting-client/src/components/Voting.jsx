import React from 'react';

export default class Voting extends React.Component {

  getPair() {
    return this.props.pair || []; 
  }

  renderEntry(entry) {
    return (
      <button key={entry}>
        <h1>{entry}</h1>
      </button>
    );
  }

  render() {
    return (
      <div className="voting">
        { this.getPair().map(this.renderEntry) }
      </div>
    );
  }
}


      