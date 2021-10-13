import React from 'react';

class Summoner extends React.Component {
  constructor(props) {
    super(props);
    this.changeSummoner = this.changeSummoner.bind(this);
  }

  changeSummoner(event) {
    this.props.handleClick(this.props.player.summonerName);
  }

  render() {

    var champName = this.props.player.championName;
    if (champName === 'FiddleSticks') {
      champName = 'Fiddlesticks'
    }
    return (
      <div className='summoner'>
      <div className='summonerChampImg'>
      <img src={"http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/" +
                  champName +
                  ".png"}></img>
      </div>
      <div className='summonerName' onClick={this.changeSummoner}>
        {this.props.player.summonerName}
      </div>
    </div>
  )
}

}

export default Summoner;