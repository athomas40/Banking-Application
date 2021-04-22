import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Debits from './components/Debits';
import LogIn from './components/LogIn';
import Credits from './components/Credits';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBalance: 0,
            currentUser: {
                userName: 'amy_smith',
                memberSince: '01/14/00',
            },
            debits: [],
            credits: [],
            creditDescription: '',
            creditAmount: 0,
            currentTime: new Date().toLocaleString(),
        };
        this.handlerDebit = this.handlerDebit.bind(this);
        this.handlerCredit = this.handlerCredit.bind(this);
        // this.addDebit = this.addDebit.bind(this)
        // this.addCredit = this.addCredit.bind(this)
    }
    handlerDebit(debitAmount){
        console.log(typeof debitAmount)
        this.setState({
            accountBalance: this.state.accountBalance - parseFloat(debitAmount)
        });
    }

    handlerCredit(creditAmount){
        console.log(typeof this.state.accountBalance);
        console.log(typeof creditAmount);

        this.setState({
            accountBalance: this.state.accountBalance + parseFloat(creditAmount)
        });
        console.log(this.state.accountBalance);
    }

    async componentDidMount() {
        let debits = await axios.get('https://moj-api.herokuapp.com/debits');
        let credits = await axios.get('https://moj-api.herokuapp.com/credits');

        //get data from API response
        debits = debits.data;
        credits = credits.data;

        // console.log(credits);

        let debitSum = 0,
            creditSum = 0;
        debits.forEach((debit) => {
            debitSum += debit.amount;
        });

        credits.forEach((credit) => {
            creditSum += credit.amount;
        });

        const accountBalance = creditSum - debitSum;

        this.setState({ debits, credits: credits, accountBalance });
    }

    mockLogIn = (logInInfo) => {
        const newUser = { ...this.state.currentUser };
        newUser.userName = logInInfo.userName;
        this.setState({ currentUser: newUser });
    };

    render() {
        const HomeComponent = () => (
            <Home accountBalance={this.state.accountBalance} />
        );

        const UserProfileComponent = () => (
            <UserProfile
                userName={this.state.currentUser.userName}
                memberSince={this.state.currentUser.memberSince}
            ></UserProfile>
        );

        const LogInComponent = () => (
            <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
        );

        const CreditComponent = () => (
            <Credits
                credits={this.state.credits}
                accountBalance={this.state.accountBalance}
                handlerCredit={this.handlerCredit}
            />
        );
      
        // const DebitComponent = () => (<Debits allDebits={this.state.debits} accountBalance={this.state.accountBalance}/>)
        const DebitComponent = () => (<Debits allDebits={this.state.debits} accountBalance={this.state.accountBalance} handlerDebit={this.handlerDebit}/>)
        return (
            <div className="App">
                <Router>
                  <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/userProfile" render={UserProfileComponent} />
                    <Route exact path="/login" render={LogInComponent} />
                    <Route exact path="/debits" render={DebitComponent}/>
                    <Route exact path="/credits" render={CreditComponent} />
                  </Switch>
                </Router>
            </div>
        );
    }

}

export default App;
