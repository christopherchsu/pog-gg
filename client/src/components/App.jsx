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
      rankInfo: []
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
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
    <div>
      <Search userName={this.state.userName} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
      <Profile userInfo={this.state.userInfo} rankInfo={this.state.rankInfo}/>
    </div>
    )
  }
}

export default App;