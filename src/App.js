import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';

class App extends Component {
  constructor(){
    super();
    this.state = {
      accountBalance: 14500.50,
      currentUser:{
        userName: 'amy_smith',
        memberSince: '01/14/00',
      }
    }
  }

  render(){
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>)

    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}></UserProfile>
    )
    return(
      <Router>
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
      </Router>
      
    );
  }
}

export default App;