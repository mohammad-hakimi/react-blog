import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import Axios from 'axios';
import config from '../../config';
import loadingGif from '../../gifs/loading.svg';


const {validateAll} = window;
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            username: '',
            password: '',
            password_confirmation: '',
            email: '',
            errors: {},
            loading: false,
            success: false,
            logs: ''

        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkIfEmailIsUnique = this.checkIfEmailIsUnique.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);

    }

    handleChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    async componentDidMount() {
        const respond = await Axios.get(`https://5f81d6b10695720016432f65.mockapi.io/user`);
        this.setState({
            userList: respond.data
        });
    }

    onRegisterClick(event) {
        event.preventDefault();
        this.setState({loading: true});
        if (this.checkIfEmailIsUnique) {
            const data = this.state;
            const rules = {
                username: 'required|string',
                email: 'required|email',
                password: 'required|string|min:6|confirmed',
            }

            const messages = {
                required: 'The {{ field }} is required',
                'email.email': 'This email is invalid',
                'password.confirmed': 'The password confirmation does not match'
            }
            const formattedErrors = {};
            let respond = {};
            validateAll(data, rules, messages)
                .then(async () => {
                    respond = await Axios.post(`${config.apiUrl}/user`, {
                        username: this.state.username,
                        email: this.state.email,
                        password: this.state.password
                    });
                    console.log(respond);
                    localStorage.setItem('user', respond.config.data);
                    const userList = this.state.userList;
                    userList.push(respond.data);
                    this.setState({
                        userList: userList,
                        loading: false,
                        success: true
                    });
                    this.props.setAuthUser(respond.data);
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 2000);
                }).catch((errors) => {
                    errors.forEach((error) => {
                        formattedErrors[error.field] = error.message
                    });
                    this.setState({
                        errors: formattedErrors,
                        loading: false
                    });
                }
            );
        }
    }


    checkIfEmailIsUnique = () => {
        for (let i = 0; i < this.state.userList.length; i++) {
            if (this.state.email === this.state.userList[i].email) {
                this.setState({loading: false, errors: {email: "This email has already been taken."}});
                return false;
            }
        }
        // console.log(true);
        return true;
    }


    render() {
        return (
            <div className="mh-fullscreen bg-img center-vh p-20"
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
                <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
                    <h5 className="text-uppercase text-center">Register</h5>
                    <br/>
                    <br/>
                    <form className="form-type-material" onSubmit={this.onRegisterClick}>
                        <div className="form-group">
                            <input type="text" name="username" className="form-control" placeholder="Username"
                                   value={this.state.username} onChange={this.handleChanges}/>
                            {
                                this.state.errors.username &&
                                <small className="text-danger">{this.state.errors["username"]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="text" name="email" className="form-control" placeholder="Email address"
                                   value={this.state.email} onChange={this.handleChanges}/>
                            {
                                this.state.errors["email"] &&
                                <small className="text-danger">{this.state.errors["email"]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" placeholder="Password"
                                   value={this.state.password} onChange={this.handleChanges}/>
                            {
                                this.state.errors["password"] &&
                                <small className="text-danger">{this.state.errors["password"]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" name="password_confirmation" className="form-control"
                                   placeholder="Password (confirm)"
                                   value={this.state.password_confirmation} onChange={this.handleChanges}/>
                        </div>
                        <br/>
                        <button className="btn btn-bold btn-block btn-primary" disabled={this.state.loading}
                                type="submit">
                            {!this.state.loading ? 'Register' : <img className="w-20" src={loadingGif} alt=""/>}
                        </button>
                        <small className="text-success">{this.state.success && "Registration was successful."}</small>
                    </form>
                    <hr className="w-30"/>
                    <p className="text-center text-muted fs-13 mt-20">Already have an account?
                        <Link to={`/account/login`}>Sign in</Link>
                    </p>
                </div>
            </div>
        );
    }


}

export default Signup;