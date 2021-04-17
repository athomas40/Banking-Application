import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './LogIn.css';

class Home extends Component{
    render(){
        return(
            <div>
                <div className="addSpace"></div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zHEzmH_uepmgzXkwBCejtiEquMgPS8cu0Q&usqp=CAU" alt="bank"/>
                <h1> Bank of React </h1>

                <Link to="/logIn">Log In</Link>
                <br />
                <Link to="/userProfile">User Profile</Link>
                <br />
                <Link to="/debits">Debits</Link>
                <br />
                <Link to="/credits">Credits</Link>

                <h2>Account Balance</h2>
                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Home;