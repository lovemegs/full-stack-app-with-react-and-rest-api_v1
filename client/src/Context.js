import React, { createContext, useState } from "react";
import axios from "axios";
import config from "./config";

// this whole file is used to authenticate the users, which is used throughout the app
export const Context = createContext();

export const ContextProvider = (props) => {
    const [authUser, setAuthUser] = useState();

    const signIn = async (emailAddress, password) => {
        const user = await axios.get(`${config.apiUrl}/users`, { auth: {username: emailAddress, password: password}});
        if (user !== null) {
            setAuthUser(user);
        } else {
            console.log('No user found');
        }
        return user;
    }

    const signOut = () => {
        setAuthUser(null);
    }

    const value = {
        authUser,
        actions: {
            signIn: signIn,
            signOut: signOut
        },
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}

export default Context;

