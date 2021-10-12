import React from 'react';

class Match extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        HELLO
        {this.props.matchId}
      </div>
    )
  }
}


export default Match;