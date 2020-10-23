import React from "react";
import {Link} from "react-router-dom";
import LoginForm from './LoginForm'


const Login = (props) => {
    return (
       <LoginForm {...props} setAuthUser={props.setAuthUser}/>
    );
}

export default Login;
