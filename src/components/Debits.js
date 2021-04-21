import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import './Debits.css';

class Debits extends Component{
    constructor(props){
        super(props)
        this.state = {
            description: '',
            amount: 0,
            date: '',

            balance: this.props.accountBalance,
            // accountBalance: this.props.accountBalance,

            alldebits: [],
            alldescription: [],
            allamount: [],
            alldate: [],
        }
    }

    componentDidMount() {
        let descipt = [], money = [], day = [], currentdebit = [], tempdebit = [];
        //stores debit values from API
        for (let i=0; i< this.props.allDebits.length; i++)  {
            descipt.push(this.props.allDebits[i].description);
            money.push(this.props.allDebits[i].amount);
            day.push(this.props.allDebits[i].date);

            tempdebit = [];
            tempdebit.push(this.props.allDebits[i].description, this.props.allDebits[i].amount, this.props.allDebits[i].date);
            currentdebit.push(tempdebit);
        }
        this.setState({
            alldescription: descipt,
            allamount: money,
            alldate: day,
            alldebits: currentdebit,
        })
    }

    submitDebits = (event) => {
        event.preventDefault();
        let formattedDate = new Date(this.state.date).toISOString();    //formats date as UTC
        let tempdebit = [this.state.description, this.state.amount, formattedDate];
        let currentdebit = this.state.alldebits;
        let updatebalance = this.state.balance;
        currentdebit.push(tempdebit);

        console.log(currentdebit);
        console.log(tempdebit);
        console.log(tempdebit[1]);
        console.log(updatebalance - tempdebit[1]);
        let amountTemp = tempdebit[1];

        // this.props.accountBalance = this.props.accountBalance - tempdebit[1];
        // console.log(this.state.accountBalance);
        console.log(typeof amountTemp);
        this.props.handlerDebit(amountTemp);
        this.setState({alldebits: currentdebit, balance: updatebalance-tempdebit[1]});
    }

    handleChangeDescription = (des) => {
        this.setState({description: des.target.value });
    }
    handleChangeAmount = (num) => {
        this.setState({amount: num.target.value});
    }
    handleChangeDate = (day) => {
        this.setState({date: day.target.value});
    }

    render(){
        return(
            <div className = "BackgroundColor2"> 
                <h1>Debits</h1>
                <div>
                    {this.state.alldebits.map((debits, index) => {
                        return (
                            <div className="Debits-Transaction" key={index}>
                                <p>Description: {debits[0]}</p>
                                <p>Amount: {debits[1]}</p>
                                <p>Date: {debits[2]}</p>
                            </div>
                        );
                    })}
                </div>
                <br />

                <h3>Enter a new debit transaction:</h3>
                <form onSubmit={this.submitDebits}>
                    <label>
                        Description:
                        <input type="text" name="description" onChange={this.handleChangeDescription}/>
                        Amount:
                        <input type="number" name="amount" onChange={this.handleChangeAmount}/>
                        Date:
                        <input type="date" name="date" min="2000-01-01" max="2022-12-31" placeholder="yyyy-mm-dd" onChange={this.handleChangeDate}/>
                    </label>
                    <button>Add transaction</button>
                </form>

                <div className = "Spacing"> 
                <h2>Account Balance</h2>
                <AccountBalance accountBalance={this.props.accountBalance}/>

                <br/>
                <Link to="/">Home</Link>
                <br />
                <Link to="/logIn">Log In</Link>
                <br />
                <Link to="/userProfile">User Profile</Link>
                <br />
                <Link to="/credits">Credits</Link></div>
        </div>
        );
    }
}

export default Debits;