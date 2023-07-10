import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context";

const UserSignIn = () => {
    const context = useContext(Context);
    const history = useNavigate();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    // handles the sign-in button
    const handleSubmit = async (e) => {
        e.preventDefault();
       await context.actions.signIn(emailAddress, password)
        .then(() => {
            history('/');
        })
        .catch((error) => {
            console.log('Error signing in', error);
        })
    }

    return (
        <div className="form--centered">
                <h2>Sign In</h2>
    
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="button" type="submit" onClick={handleSubmit}>Sign In</button><Link className="button button-secondary" to='/'>Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>   
        </div>
    )
};

export default UserSignIn;