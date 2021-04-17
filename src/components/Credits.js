import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './Credits.css';


class Credits extends Component {
    constructor(props){
        super(props)
        this.state = {
            amount: 0,
            date: '',
            description: '',
            credits: [],
        }
    }

    componentDidMount() {
        const copiedCredits = this.props.credits.map( credit => credit )
        this.setState({ credits: copiedCredits })
    }


    handleDescriptionChange = (des) => {
        this.setState({
            description: des.target.value,
        });
    };

    handleAmountChange = (num) => {
        this.setState({
            amount: num.target.value,
        });
    };

    handleDateChange = (day) => {
        this.setState({
            date: day.target.value,
        });
    };

    handleCreditSubmit = (event) => {
      event.preventDefault();
      let formattedDate = new Date(this.state.date).toISOString(); // formats date as UTC
      let tempCredit = {description: this.state.description, amount: this.state.amount, date: formattedDate};
      let creditAmount = tempCredit.amount;
      console.log(tempCredit.amount);

      this.props.handlerCredit(creditAmount);

      this.setState(
          currentCredits => ({
              credits: [...currentCredits.credits, tempCredit],
          })
      )
    }


    render() {
        return (
            <div>
                <h1>Credits</h1>
                <div>
                    {this.state.credits.map((c, index) => {
                        return (
                            <div className="Credits-Transaction" key={index}>
                                <p>Description: {c.description}</p>
                                <p>Amount: {c.amount}</p>
                                <p>Date: {c.date}</p>
                            </div>
                        );
                    })}
                </div>
                <br />

                <h3>Enter a new credit transaction:</h3>
                <form onSubmit={this.handleCreditSubmit}>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleDescriptionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            onChange={this.handleAmountChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            min="1970-01-01"
                            max="2050-12-31"
                            placeholder="yyyy-mm-dd"
                            onChange={this.handleDateChange}
                        />
                    </div>
                    <button>Add transaction</button>
                </form>

                <h2>Account Balance</h2>
                <AccountBalance accountBalance={this.props.accountBalance}/>

                <Link to="/">Home</Link>
                <br />
                <Link to="/logIn">Log In</Link>
                <br />
                <Link to="/userProfile">User Profile</Link>
                <br />
                <Link to="/debits">Debits</Link>
                
            </div>
        );
    }
}

export default Credits;
