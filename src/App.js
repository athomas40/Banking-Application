import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      accountBalance: 0,
      currentUser:{
        userName: 'amy_smith',
        memberSince: '01/14/00',
      },
      debits: [],
      credits: []
    }
    // this.addDebit = this.addDebit.bind(this)
    // this.addCredit = this.addCredit.bind(this)

  }

  async componentDidMount(){
    let debits = await axios.get("https://moj-api.herokuapp.com/debits");
    let credits = await axios.get("https://moj-api.herokuapp.com/credits");

    //get data from API response
    debits = debits.data
    credits = credits.data

    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) =>{
      debitSum += debit.amount
    })

    credits.forEach((credit) => {
      creditSum += credit.amount
    })

    const accountBalance = creditSum - debitSum;

    this.setState({debits, credits, accountBalance});
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
      <div className="App">
        <Router>
          <Route exact path="/" component={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
        </Router>
      </div>
      
    );
  }
}

export default App;