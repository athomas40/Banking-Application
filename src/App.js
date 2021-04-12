import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';

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
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser:newUser})
  }

  render(){
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>)

    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}></UserProfile>
    )

    const LogInComponent= () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    return(
      <Router>
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
      </Router>
      
    );
  }
}

export default App;