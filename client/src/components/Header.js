import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState([]);
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/courses">Courses</Link></h1>
                <nav>
                        <ul className="header--signedin">
                            <li>Welcome, {user.firstName} {user.lastName}!</li>
                            <li><Link to="/signout">Sign Out</Link></li>
                        </ul>
                        <React.Fragment>
                            <ul className="header--signedout">
                                <li><Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                            </ul>
                        </React.Fragment>
                </nav>
            </div>
        </header>
    )
}

export default Header;