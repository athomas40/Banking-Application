import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component{
    constructor(props){
        super(props)
        this.state = {
            description: '',
            amount: 0,
            date: '',

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
        currentdebit.push(tempdebit);
        
        this.setState({alldebits: currentdebit});
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
            <div>
                <h1>Debits</h1>
                {
                    this.state.alldebits.map( (debits, index) => {
                        return (
                            <div>
                                <li key={index}>${debits[1]} {debits[0]} {debits[2]}</li>
                            </div>
                        )
                    })
                }
                
                <div>
                <br></br>
                <form onSubmit={this.submitDebits}>
                    <label>
                        Description:
                        <input type="text" name="description" onChange={this.handleChangeDescription}/>
                        Amount:
                        <input type="number" name="amount" onChange={this.handleChangeAmount}/>
                        Date:
                        <input type="date" name="date" min="2000-01-01" max="2022-12-31" placeholder="yyyy-mm-dd" onChange={this.handleChangeDate}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                </div>
                <br></br>
                <Link to="/">Home</Link>
                <div></div>
                <Link to="/logIn">Log In</Link>
                <div></div>
                <Link to="/userProfile">User Profile</Link>
                <div></div>
            </div>
        );
    }
}

export default Debits;