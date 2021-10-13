import React from "react";
import Rank from './Rank.jsx';
import MatchHistoryList from './MatchHistoryList.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return Object.keys(this.props.userInfo).length !== 0 ? (
      <div>
        <div className="userProfile">
          <span className="name">{this.props.userInfo.name}</span>
          <img
            className="profileIcon"
            src={
              "https://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/" +
              this.props.userInfo.profileIconId +
              ".png"
            }
          ></img>
          <span className="level">{this.props.userInfo.summonerLevel}</span>
        </div>
        <div>
        <Rank rankInfo={this.props.rankInfo}/>
        <MatchHistoryList matchIds={this.props.matchIds} summonerName={this.props.userInfo.name}/>
        </div>
      </div>
    ) : (
      <div>No User</div>
    );
  }
}

export default Profile;
