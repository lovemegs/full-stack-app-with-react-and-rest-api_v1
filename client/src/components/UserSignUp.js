import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context";
import axios from "axios";
import config from "../config";

const UserSignUp = () => {
    const context = useContext(Context);
    const history = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // creates a new user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {emailAddress: emailAddress, password: password, firstName: firstName, lastName: lastName};
        await axios.post(`${config.apiUrl}/users`, newUser)
            .then(() => {
                console.log('New user created');
                context.actions.signIn(emailAddress, password);
                history('/');
            })
            .catch ((error) => {
                setErrors(error.response.data.errors);
                console.log(`Sign-up was unsuccessful`, error);
            })
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            {/* validation errors */}
            {
                errors.length ?
                (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, i) => {return <li key={i}>{error}</li>})}
                        </ul>
                    </div>
                ) : (null)
            }
            <form>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button><Link className="button button-secondary" to='/'>Cancel</Link>
            </form>
            <p>Already have a user account? Click here to <Link to="/signIn">sign in</Link>!</p>
        </div>
    )
}

export default UserSignUp;