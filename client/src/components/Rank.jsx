import React from 'react';

class Rank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.rankInfo.length !== 0 ? (
        <div className="rankInfo">
          <div className="soloRank box">
            <div className="rankImg">
              <img
                className="soloRankIcon"
                src={
                  "./ranked-emblems/" + this.props.rankInfo[0].tier + ".png"
                }
              ></img>
            </div>
            <div className="rankDetails">
              <div className="rankType">Ranked Solo</div>
              <div className="tierRank">
                {this.props.rankInfo[0].tier.slice(0, 1) +
                  this.props.rankInfo[0].tier.toLowerCase().slice(1) +
                  " " +
                  this.props.rankInfo[0].rank}
              </div>
              <div className="tierInfo">
                <span className="leaguePoints">
                  {this.props.rankInfo[0].leaguePoints + " LP"}
                </span>
                {" / "}
                <span className="winLose">
                  {this.props.rankInfo[0].wins +
                    "W " +
                    this.props.rankInfo[0].losses +
                    "L"}
                </span>
              </div>
            </div>
          </div>
          <div className="flexRank box">
            <div className="rankImg">
              <img
                className="flexRankIcon"
                src={
                  "./ranked-emblems/" + this.props.rankInfo[1].tier + ".png"
                }
              ></img>
            </div>
            <div className="rankDetails">
              <div className="rankType">Ranked Flex</div>
              <div className="tierRank">
                {this.props.rankInfo[1].tier.slice(0, 1) +
                  this.props.rankInfo[1].tier.toLowerCase().slice(1) +
                  " " +
                  this.props.rankInfo[1].rank}
              </div>
              <div className="tierInfo">
                <span className="leaguePoints">
                  {this.props.rankInfo[1].leaguePoints + " LP"}
                </span>
                {" / "}
                <span className="winLose">
                  {this.props.rankInfo[1].wins +
                    "W " +
                    this.props.rankInfo[1].losses +
                    "L"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rankInfo"></div>
      )
    )
  }
}

export default Rank;