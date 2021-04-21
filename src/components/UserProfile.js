import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css';

class UserProfile extends Component{
    render(){
        return(
            <div className="Style3">
                <h1>User Profile</h1>

                <div>Username: {this.props.userName}</div>
                <div>Member Since: {this.props.memberSince}</div>
                <br />
                <Link to='/'>Return to Home <br /> </Link>
                <br /> 
            </div>
        );
    }
}

export default UserProfile;