import React from "react";
import axios from "axios";
import Item from "./Item.jsx";
import Summoner from './Summoner.jsx';

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetails: {},
    };
  }

  componentDidMount() {
    axios
      .get("/match/" + this.props.matchId)
      .then((data) => {
        this.setState({
          matchDetails: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.matchId !== prevProps.matchId) {
      axios
        .get("/match/" + this.props.matchId)
        .then((data) => {
          this.setState({
            matchDetails: data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {

    if (Object.keys(this.state.matchDetails).length !== 0) {
      var gameType = this.props.queueTypes.find(
        (element) => element.queueId === this.state.matchDetails.info.queueId
      ).description || 'Normal';
      var gameInfo = this.state.matchDetails.info;
      var unixTimeStamp = gameInfo.gameStartTimestamp + gameInfo.gameDuration;
      if (gameInfo.gameEndTimestamp === undefined) {
        var gameLength = (gameInfo.gameDuration / 1000) / 60;
      } else {
        var gameLength = (gameInfo.gameDuration) / 60;
      }
      var timePassed =
        (Math.round(new Date().getTime()) - unixTimeStamp) / 1000;
      var timeStampIdx = 0;
      var timeStamp = [
        { places: "minutes", multiplier: 60 },
        { places: "hours", multiplier: 60 },
        { places: "days", multiplier: 24 },
        { places: "months", multiplier: 30 },
      ];
      while (
        timePassed / timeStamp[timeStampIdx].multiplier > 1 &&
        timeStampIdx < 3
      ) {
        timePassed /= timeStamp[timeStampIdx].multiplier;
        timeStampIdx += 1;
      }
      var player = gameInfo.participants.find(
        (element) => element.summonerName === this.props.summonerName
      );
      var gameResult = player.win;
      var ss1Id = player.summoner1Id.toString();
      var ss2Id = player.summoner2Id.toString();
      for (var key in this.props.summonerSpells.data) {
        if (this.props.summonerSpells.data[key].key === ss1Id) {
          var ss1 = key;
        }
        if (this.props.summonerSpells.data[key].key === ss2Id) {
          var ss2 = key;
        }
      }
      var playerPrimaryRuneId = player.perks.styles[0].selections[0].perk;
      var playerSecondaryRuneId =
        Math.floor(player.perks.styles[1].selections[0].perk / 100) * 100;
      if (playerSecondaryRuneId >= 9000) {
        playerSecondaryRuneId = 8000;
      }
      for (var i = 0; i < this.props.runes.length; i++) {
        var playerPrimaryRune = this.props.runes[i].slots[0].runes.find(
          (element) => element.id === playerPrimaryRuneId
        );
        if (playerPrimaryRune !== undefined) {
          break;
        }
      }
      var playerSecondaryRune = this.props.runes.find(
        (element) => element.id === playerSecondaryRuneId
      );
      var kdaRatio = (
        Math.round(((player.kills + player.assists) / player.deaths) * 100) /
        100
      ).toFixed(2);
      var teamStats = gameInfo.teams.find(
        (element) => element.win === gameResult
      );
      var kp = Math.round(
        ((player.kills + player.assists) /
          teamStats.objectives.champion.kills) *
          100
      );
      var items = [
        player.item0,
        player.item1,
        player.item2,
        player.item6,
        player.item3,
        player.item4,
        player.item5,
      ];
      var team1 = [];
      var team2 = [];
      for (var i = 0; i < gameInfo.participants.length; i++) {
        if (gameInfo.participants[i].teamId === 100) {
          team1.push(gameInfo.participants[i]);
        } else {
          team2.push(gameInfo.participants[i]);
        }
      }
      console.log(gameInfo.gameDuration, gameLength);
      return (
        <div className={player.win ? "match win" : "match lose"}>
          <div className="gameStats">
            <div className="gameType">{gameType.slice(0, -6)}</div>
            <div className="gameDate">
              {Math.round(timePassed).toString() +
                " " +
                timeStamp[timeStampIdx - 1].places}{" "}
              Ago
            </div>
            <div className="bar"></div>
            <div className="gameResult">
              {gameResult ? "Victory" : "Defeat"}
            </div>
            <div className="gameLength"></div>
          </div>
          <div className="playerChampionInfo">
            <div className="championImage">
              <img
                src={
                  "http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/" +
                  player.championName +
                  ".png"
                }
              ></img>
            </div>
            <div className="summonerSpells">
              <div className="spell">
                <img
                  src={
                    "http://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/" +
                    ss1 +
                    ".png"
                  }
                />
              </div>
              <div className="spell">
                <img
                  src={
                    "http://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/" +
                    ss2 +
                    ".png"
                  }
                />
              </div>
            </div>
            <div className="runes">
              <div className="rune">
                <img
                  src={
                    "https://ddragon.leagueoflegends.com/cdn/img/" +
                    playerPrimaryRune.icon
                  }
                />
              </div>
              <div className="rune">
                <img
                  src={
                    "https://ddragon.leagueoflegends.com/cdn/img/" +
                    playerSecondaryRune.icon
                  }
                />
              </div>
            </div>
            <div className="championName">{player.championName}</div>
          </div>
          <div className="killStats">
            <div className="kda">
              <span className="kills">{player.kills}</span>
              {" / "}
              <span className="deaths">{player.deaths}</span>
              {" / "}
              <span className="assists">{player.assists}</span>
            </div>
            <div className="kdaRatio">
              <span className="ratio">{kdaRatio !== 'Infinity' ? kdaRatio.toString() + ':1' : 'Perfect'}</span>
              {" KDA "}
            </div>
          </div>
          <div className="individualStats">
            <div className="champLevel">Level {player.champLevel}</div>
            <div className="cs">
              {player.totalMinionsKilled + player.neutralMinionsKilled}{" "}(
              {(
                (player.totalMinionsKilled + player.neutralMinionsKilled) /
                gameLength
              ).toFixed(1)}
              ) CS
            </div>
            <div className="kp">P/Kill {kp}%</div>
          </div>
          <div className="items">
            <div className="itemList">
              {items.map((item, idx) => {
                return <Item id={item} key={item*10 + idx} />;
              })}
            </div>
          </div>
          <div className='players'>
            <div className='team'>
              {team1.map(player => {
                return <Summoner player={player} key={player.summonerName} handleClick={this.props.handleClick} />
              })}
            </div>
            <div className='team'>
            {team2.map(player => {
                return <Summoner player={player} key={player.summonerName} handleClick={this.props.handleClick} />
              })}
              </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Match;
