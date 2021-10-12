import React from 'react';


class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div className='search'>
      <form>
        <input name='userName' value={this.props.userName} type='text' placeholder='Username' onChange={this.props.handleInputChange}></input>
        <button type='submit' onSubmit={this.props.handleSubmit} onClick={this.props.handleSubmit}><i className="fa fa-search"></i></button>
      </form>
    </div>
    )
  }
}

export default Search;