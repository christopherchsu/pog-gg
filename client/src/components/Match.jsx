import React from 'react';
import axios from 'axios';

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetails: {},
    }
  }

  componentDidMount() {
    axios.get('/match/' + this.props.matchId)
    .then(data => {
      this.setState({
        matchDetails: data.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (Object.keys(this.state.matchDetails).length !== 0) {
      var gameType = this.props.queueTypes.find(element => element.queueId === this.state.matchDetails.info.queueId).description;
      var gameInfo = this.state.matchDetails.info;
      var unixTimeStamp = gameInfo.gameEndTimestamp;
      var timePassed = (Math.round((new Date().getTime())) - unixTimeStamp)/1000;
      console.log(timePassed);
      var timeStampIdx = 0;
      var timeStamp = [{places: 'minutes', multiplier: 60} , {places: 'hours', multiplier: 60}, {places: 'days', multiplier: 24}, {places: 'months', multiplier: 30}]
      while (timePassed / timeStamp[timeStampIdx].multiplier > 1 && timeStampIdx < 3) {
        timePassed /= timeStamp[timeStampIdx].multiplier;
        timeStampIdx += 1;
      }
      var gameResult = gameInfo.participants.find(element => element.summonerName === this.props.summonerName).win;
      return (
        <div className='match'>
        <div className='gameStats'>
          <div className='gameType'>{gameType.slice(0, -6)}</div>
          <div className='gameDate'>{Math.round(timePassed).toString() + ' ' + timeStamp[timeStampIdx - 1].places} Ago</div>
          <div className='bar'></div>
          <div className='gameResult'>{gameResult ? 'Victory' : 'Defeat'}</div>
          <div className='gameLength'></div>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }

  }
}


export default Match;