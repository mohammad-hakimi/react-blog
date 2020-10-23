import React from "react";
import {Redirect, Route} from "react-router";
import Login from "../../components/Login";


const Auth = ({component: Component, isAuthenticated, path, props}) => {
    return (
        <Route
            path={path}
            render={routerProps => {
                if (isAuthenticated || localStorage.getItem('user')) {
                    return (
                        <Component {...props} {...routerProps} />
                    );
                } else {
                    return (
                        <Redirect to="/account/login"/>
                    );
                }
            }}
        />

    );


}

export default Auth;