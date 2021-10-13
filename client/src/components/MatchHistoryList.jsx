import React from 'react';
import Match from './Match.jsx';
import queues from './queues';


class MatchHistoryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      this.props.matchIds.length !== 0 ?
      <div className='matchHistory'>
        {this.props.matchIds.map(matchId => {
          return <Match matchId={matchId} key={matchId} queueTypes={queues} summonerName={this.props.summonerName}/>
        })}
      </div>
      :
      <div className='matchHistory'>
      </div>
    )
  }
}


export default MatchHistoryList;