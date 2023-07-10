import React, { useContext } from "react";
import Context from "./Context";
import { useLocation, Outlet, Navigate } from "react-router-dom";

// makes certain routes private so that only users that are signed in can access those pages
const PrivateRoute = () => {
    const {authUser} = useContext(Context);
    const location = useLocation();

    return (
       authUser
        ? <Outlet />
        : <Navigate to='/signin' state={{ from: location }} replace />
    );
}

export default PrivateRoute;