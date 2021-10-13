import React from 'react';
import Search from './Search.jsx';
import Profile from './Profile.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userInfo: {},
      rankInfo: [],
      matchIds: [],
      fetched: true,
      mostPlayedChamp: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(name) {
    this.setState({
      userName: name
    })
    this.setState({
      fetched: false
    })
    axios.get(`/summoner/${name}`)
    .then( data => {
      this.setState({
        userInfo: data.data,
        userName: ''
      })
      axios.get(`/summoner/${data.data.id}/rank`)
      .then(data => {
        this.setState({
          rankInfo: data.data
        })
      })
      .catch(err => {
        console.log(err);
      });
      axios.get(`/mostplayedchampion/${data.data.id}`)
      .then(data => {
        this.setState({
          mostPlayedChamp: data.data[0]
        })
      })
      .catch(err => {
        console.log(err);
      });
      axios.get(`/matchhistory/${data.data.puuid}`)
      .then(data => {
        this.setState({
          matchIds: data.data,
          fetched: true
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      fetched: false
    })
    var userName = this.state.userName;
    axios.get(`/summoner/${userName}`)
    .then( data => {
      this.setState({
        userInfo: data.data,
        userName: ''
      })
      axios.get(`/summoner/${data.data.id}/rank`)
      .then(data => {
        this.setState({
          rankInfo: data.data
        })
      })
      .catch(err => {
        console.log(err);
      });
      axios.get(`/mostplayedchampion/${data.data.id}`)
      .then(data => {
        this.setState({
          mostPlayedChamp: data.data[0]
        })
      })
      .catch(err => {
        console.log(err);
      });
      axios.get(`/matchhistory/${data.data.puuid}`)
      .then(data => {
        this.setState({
          matchIds: data.data,
          fetched: true
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.state.fetched) {

      return(
        <div>
      <Search userName={this.state.userName} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
      <Profile userInfo={this.state.userInfo} rankInfo={this.state.rankInfo} mostPlayedChamp={this.state.mostPlayedChamp} matchIds={this.state.matchIds} handleClick={this.handleClick}/>
    </div>
    )
  } else {
    return (
      <div className='loader'></div>
    )
  }
  }
}

export default App;