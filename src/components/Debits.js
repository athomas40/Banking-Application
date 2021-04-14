import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component{
    constructor(props){
        super(props)
        this.state ={
            debits: this.props.allDebits,
        }
    }

    render(){
        return(
            <div>
                <h1>Debits</h1>
                {
                    this.props.allDebits.map( (debit) => {
                        return (
                            <div>
                                <li>{debit.amount} - {debit.description} - {debit.date}</li>
                            </div>
                        )
                    })
                }
                <div>
                <br></br>
                <form>
                    <label>
                        Description:
                        <input type="text" name="description" />
                        Amount:
                        <input type="number" name="amount" />
                        Date:
                        <input type="date" name="date" />
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