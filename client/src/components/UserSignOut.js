import React, { useContext, useEffect } from "react";
import Context from "../Context";
import { Navigate } from "react-router-dom";

// signs the user out and redirects to the home page
const UserSignOut = () => {
    const context = useContext(Context);
    useEffect(() => {
        context.actions.signOut();
    });

    return (
        <Navigate to='/' />  
    )
}

export default UserSignOut;