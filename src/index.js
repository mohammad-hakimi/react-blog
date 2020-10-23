import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import Navbar from './components/Navbar'
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import CreatArticle from "./components/Article/CreateArticle";
import Login from "./components/Login";
import SingleArticle from "./components/Article/SingleArticle";
import Signup from "./components/Signup";
import Auth from "./Services/Auth";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authUser: null
        }

    }
    componentDidMount() {
        this.setState({
            authUser: JSON.parse(localStorage.getItem('user'))
        });
    }

    setAuthUser = (authUser) => {
        this.setState({
            authUser
        })
    }

    logout = () => {
        localStorage.removeItem('user');
        this.setState({ authUser: null })

    }



    render() {
        const location = this.props.location;

        return (
            <div>
                {
                    (location.pathname !== '/account/login'  && location.pathname !== '/account/signup') &&
                    <Navbar user={this.state.authUser} logout={this.logout}/>
                }
                <Route exact path="/" render={(props => <Welcome {...props}/> )}/>
                <Auth
                    component={CreatArticle}
                    path="/articles/create"
                    isAuthenticated={this.state.authUser !== null}
                    props={{
                        authUser: this.state.authUser? this.state.authUser: null,
                        setAuthUser: this.setAuthUser
                    }}
                />
                <Route path="/account/login" render={(props) => <Login {...props} setAuthUser={this.setAuthUser}/>}/>
                <Route path="/category/:cSlug/article/:slug" render={props => <SingleArticle {...props}/> } />
                <Route path="/account/signup" render={(props) => <Signup {...props} setAuthUser={this.setAuthUser}/>}/>
                {
                    (location.pathname !== '/account/login'  && location.pathname !== '/account/signup') &&
                    <Footer />
                }
            </div>

        );
    }
}


const Main = withRouter((props) => {
    return (
        <App {...props}/>
    );
})


ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
