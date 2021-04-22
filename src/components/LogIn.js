import React, {Component} from 'react';
import {Redirect } from 'react-router-dom';
import './LogIn.css';


class LogIn extends Component{ 
    constructor(){
        super()
        this.state ={
            user: {
                userName: '',
                password: ''
            },
            redirect: false
        }
    }

    handleChange = (e) => {
        const updatedUser = {...this.state.user}
        const inputField = e.target.name
        const inputValue = e.target.value
        updatedUser[inputField] = inputValue
        console.log(updatedUser);

        this.setState({user:updatedUser})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.mockLogIn(this.state.user)
        this.setState({redirect: true})
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to="/userProfile"/>)
        }

        return(
            <div className="Style2">
                <form onSubmit={this.handleSubmit}>
                <h1>Log In Page</h1>
                <div className="addSpace"></div>
                <div>
                    <label htmlFor="userName">User Name: </label>
                    <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
                </div>
                <div className="addSpace"></div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" />
                </div>
                <div className="addSpace"></div>
                <button>Log In</button>
                </form>
                <br />
            </div>
        );
    }


}

export default LogIn;