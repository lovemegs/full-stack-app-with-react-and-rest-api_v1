import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../Context";

const Header = () => {
    const context = useContext(Context);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {/* checks if a user is signed in */}
                    {context.authUser ? (
                        // displays the users name and sign-out button if user signed in
                        <ul className="header--signedin">
                            <li>Welcome, {context.authUser.data.firstName} {context.authUser.data.lastName}!</li>
                            <li><Link to="/signout">Sign Out</Link></li>
                        </ul>
                    ) : (
                        <React.Fragment>
                            {/* displays sign-up and sign-in buttons if no user signed in */}
                            <ul className="header--signedout">
                                <li><Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                            </ul>
                        </React.Fragment>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header;