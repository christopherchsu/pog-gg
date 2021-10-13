import React from "react";

class Rank extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    if (this.props.rankInfo.length !== 0) {
      var soloRankInfo = this.props.rankInfo.find(
        (element) => element.queueType === "RANKED_SOLO_5x5"
      );
      var flexRankInfo = this.props.rankInfo.find(
        (element) => element.queueType === "RANKED_FLEX_SR"
      );
    } else {
      var soloRankInfo = undefined;
      var flexRankInfo = undefined;
    }
    return (
      <div className="rankInfo">
        {soloRankInfo ? (
          <div className="rank box">
            <div className="rankImg">
              <img
                className="rankIcon"
                src={"./ranked-emblems/" + soloRankInfo.tier + ".png"}
              ></img>
            </div>
            <div className="rankDetails">
              <div className="rankType">Ranked Solo</div>
              <div className="tierRank">
                {soloRankInfo.tier.slice(0, 1) +
                  soloRankInfo.tier.toLowerCase().slice(1) +
                  " " +
                  soloRankInfo.rank}
              </div>
              <div className="tierInfo">
                <span className="leaguePoints">
                  {soloRankInfo.leaguePoints + " LP"}
                </span>
                {" / "}
                <span className="winLose">
                  {soloRankInfo.wins + "W " + soloRankInfo.losses + "L"}
                </span>
              </div>
              <div className="tierInfo">
                <span className="winLose">Win Ratio {Math.round(soloRankInfo.wins/(soloRankInfo.wins+soloRankInfo.losses)*100)}%</span>
                </div>
            </div>
          </div>
        ) : (
          <div className="rank box">
          <div className="rankImg">
            <img
              className="rankIcon"
              src={"./ranked-emblems/UNRANKED.png"}
            ></img>
          </div>
          <div className="rankDetails">
            <div className="rankType">Ranked Solo</div>
            <div className="tierRank">
              Unranked
            </div>
            <div className="tierInfo">
              <span className="leaguePoints">

              </span>

              <span className="winLose">

              </span>
            </div>
          </div>
        </div>
        )}
        {flexRankInfo ? (
          <div className="rank box">
            <div className="rankImg">
              <img
                className="rankIcon"
                src={"./ranked-emblems/" + flexRankInfo.tier + ".png"}
              ></img>
            </div>
            <div className="rankDetails">
              <div className="rankType">Ranked Flex</div>
              <div className="tierRank">
                {flexRankInfo.tier.slice(0, 1) +
                  flexRankInfo.tier.toLowerCase().slice(1) +
                  " " +
                  flexRankInfo.rank}
              </div>
              <div className="tierInfo">
                <span className="leaguePoints">
                  {flexRankInfo.leaguePoints + " LP"}
                </span>
                {" / "}
                <span className="winLose">
                  {flexRankInfo.wins + "W " + flexRankInfo.losses + "L"}
                </span>
              </div>
              <div className="tierInfo">
                <span className="winLose">Win Ratio {Math.round(flexRankInfo.wins/(flexRankInfo.wins+flexRankInfo.losses)*100)}%</span>
                </div>
            </div>
          </div>
        ) : (
          <div className="rank box">
          <div className="rankImg">
            <img
              className="rankIcon"
              src={"./ranked-emblems/UNRANKED.png"}
            ></img>
          </div>
          <div className="rankDetails">
            <div className="rankType">Ranked Solo</div>
            <div className="tierRank">
              Unranked
            </div>
            <div className="tierInfo">
              <span className="leaguePoints">

              </span>

              <span className="winLose">

              </span>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Rank;