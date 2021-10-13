import React from "react";
import Rank from './Rank.jsx';
import MatchHistoryList from './MatchHistoryList.jsx';
import champions from './champion'

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    if (Object.keys(this.props.userInfo).length !== 0 && Object.keys(this.props.rankInfo).length !== 0 && Object.keys(this.props.mostPlayedChamp).length !== 0 && this.props.matchIds.length !== 0) {

      for (var champ in champions.data) {
        if (parseInt(champions.data[champ].key) === this.props.mostPlayedChamp.championId) {
          var championName = champ;
          var championPoints = this.props.mostPlayedChamp.championPoints;
          break;
        }
      }
      return Object.keys(this.props.userInfo).length !== 0 ? (
        <div className='profile'>
        <div>
        <div className="userProfile">
          <div>

          <img
            className="profileIcon"
            src={
              "https://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/" +
              this.props.userInfo.profileIconId +
              ".png"
            }
            ></img>
            </div>
          <div className='container'>

            <div className="name">{this.props.userInfo.name}</div>
          <div className="level">Level {this.props.userInfo.summonerLevel}</div>
          <div className='mostPlayedChampion'>{championName + ' Main'}</div>
          <div className='masteryPoints'><div>{championPoints.toLocaleString()}</div>
          <div>Mastery Points</div>
          </div>
          </div>
        </div>
        <Rank rankInfo={this.props.rankInfo}/>
        </div>
        <MatchHistoryList matchIds={this.props.matchIds} summonerName={this.props.userInfo.name} handleClick={this.props.handleClick} />
      </div>
    ) : (
      <div className='profile'></div>
      );
    } else {
      return (
        <div className='profile'>ENTER A SUMMONER NAME TO SEARCH</div>
      )
    }
  }
  }

  export default Profile;
