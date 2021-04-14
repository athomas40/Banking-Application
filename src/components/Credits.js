import React, { Component } from 'react';
import './Credits.css';

class Credits extends Component {
    render() {
        return (
            <div>
                <h1>Credits</h1>
                <div>
                    {this.props.credits.map((c, index) => {
                        return (
                            <div className="Credits-Transaction" key={index}>
                                <p>Amount: {c.amount}</p>
                                <p>Date: {c.date}</p>
                                <p>Description: {c.description}</p>
                            </div>
                        );
                    })}
                </div>
                <br />

                <h3>Enter a new credit transaction:</h3>
                <form onSubmit={this.props.handleCreditSubmit}>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleCreditDescriptionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            onChange={this.handleCreditAmountChange}
                        />
                    </div>
                    <button>Add transaction</button>
                </form>

                <p>Account Balance : {this.props.accountBalance}</p>
            </div>
        );
    }
}

export default Credits;
