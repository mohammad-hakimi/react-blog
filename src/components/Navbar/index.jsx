import React from "react";
import {Link} from "react-router-dom";


const Navbar = ({user, logout}) => {
    return (
        <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
            <div className="container">
                <div className="topbar-left">
                    <button className="topbar-toggler">☰</button>
                    <Link className="topbar-brand" to="/">
                        <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo"/>
                        <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`}
                             alt="logo"/>
                    </Link>
                </div>
                <div className="topbar-right">
                    <ul className="topbar-nav nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles/create">Write new article</Link>
                        </li>
                        {
                            user &&
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Hey {user && user.username}!
                                    <i className="fa fa-caret-down"/>
                                </Link>
                                <div className="nav-submenu">
                                    <Link className="nav-link" to="/account/login">My articles</Link>
                                    <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                                </div>
                            </li>
                        }
                        {
                            !user &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/account/login">Login</Link>
                            </li>
                        }
                        {
                            !user &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/account/signup">Signup</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default Navbar;