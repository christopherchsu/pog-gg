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
      matchIds: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
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
      })
      axios.get(`/match/${data.data.puuid}`)
      .then(data => {
        this.setState({
          matchIds: data.data
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
    <div>
      <Search userName={this.state.userName} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
      <Profile userInfo={this.state.userInfo} rankInfo={this.state.rankInfo} matchIds={this.state.matchIds}/>
    </div>
    )
  }
}

export default App;