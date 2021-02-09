import Follower from './components/Follower'
import React from 'react'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  state = {
    user: [],
    text: '', 
    error: '',
    followers: [],
  };
  componentDidMount(){
    axios.get("https://api.github.com/users/grandelisn")
    .then(res => {
      this.setState({
        user:res.data
      });
      console.log(res);
    })
    .catch(err => console.log(err));

    axios.get("https://api.github.com/users/grandelisn/followers")
    .then(res =>{
      this.setState({
        followers: res.data,
      });
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }
  handleChanges = event => {
    this.setState({text: event.target.value});
  }
  fetchUser = event => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.text}`)
    .then(res => {
      this.setState({
        user: res.data,
        error: '',
      })
    })
    .catch(err =>{
      this.setState({
        error: 'Error try again later'
      })
    })
    axios.get(`https://api.github.com/users/${this.state.text}/followers`)
    .then(res => {
      this.setState({
        followers:res.data
      })
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="Search">
          <h3>Search for User</h3>
          <form>
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChanges}
            ></input>
            <button onClick={this.fetchUser}>Search</button>
          </form>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
        </div>

        <div className="Profile">
          <h4>{this.state.user.name}</h4>
          <div className='profileInfo'>
          <img src={this.state.user.avatar_url} alt="Profile Picture"></img>
          <p>Username: {this.state.user.login}</p>
          <p>Created account at: {this.state.user.created_at}</p>
          <p>{this.state.user.bio}</p>
          <p>Location: {this.state.user.location}</p>
          <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
          <p>Followers: {this.state.user.followers}</p>
          </div>
        </div>

        <div className="followers">
          <h3>Followers</h3>
          <div className='cards'>
            {this.state.followers.map((item) => (
              <Follower key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}


export default App;
