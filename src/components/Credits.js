import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        let copiedCredits = [];

        // copy over inital credit transactions from API
        for (let i = 0; i < this.props.credits.length; i++) {
            copiedCredits.push(this.props.credits[i]);
        }

        this.setState({ credits: copiedCredits })


        // const copiedCredits = this.props.credits.map( credit => credit )
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

                <p>Account Balance : {this.props.accountBalance}</p>

                <Link to="/">Home</Link>
                
            </div>
        );
    }
}

export default Credits;
