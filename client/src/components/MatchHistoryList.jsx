import React from 'react';
import Match from './Match.jsx';

class MatchHistoryList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      this.props.matchIds.length !== 0 ?
      <div className='matchHistory'>
        {this.props.matchIds.map(matchId => {
          <Match matchId={matchId} />
        })}
      </div>
      :
      <div className='matchHistory'>

      </div>
    )
  }
}


export default MatchHistoryList;