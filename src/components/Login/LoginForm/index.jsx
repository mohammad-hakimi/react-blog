import React from "react";
import {Link} from "react-router-dom";
import loadingGif from '../../../gifs/loading.svg';
import Axios from "axios";
import config from "../../../config";
const {validateAll} = window;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            success: false,
            loading: false,
            userList: [],
            errors: {}

        }
    }



    onChangeHandler = (event) => {
        this.setState({
            errors: {},
            [event.target.name]: event.target.value
        });
    }

    onSubmitClick = (event) => {
        event.preventDefault();
        const data = this.state;
        this.setState({
            errors:{},
            loading: true,
        });
        const rules = {
            username: 'required|string',
            password: 'required|string|min:6'
        }
        const message = {
            required: 'The {{field}} is required',
            'password.min':'The password must be at least 6 characters',
        }
        validateAll(data, rules, message)
            .then(async () => {
                let usernameFlag = false;
                let passwordFlag = false;
                let foundUser;
                const response = await Axios.get(`${config.apiUrl}/user`);
                this.setState({
                    userList: response.data
                });
                this.state.userList.forEach((user) => {
                    if (user.username === data.username){
                        usernameFlag = true;
                        if (user.password === data.password){
                            passwordFlag = true;
                            foundUser = user;
                        }
                    }

                })
                if (usernameFlag && passwordFlag){
                    localStorage.setItem('user', JSON.stringify(foundUser));
                    this.props.setAuthUser(foundUser);
                    this.props.history.push('/');

                } else if ((!usernameFlag && passwordFlag) || (!usernameFlag && !passwordFlag)){
                    this.setState({
                        errors: {
                            username: 'The username does not exist',
                        },
                        loading: false
                    });
                } else if (usernameFlag && !passwordFlag){
                    this.setState({
                        errors: {
                            password: 'The password is wrong',
                        },
                        loading: false

                    });
                }
            })
            .catch((errors) => {
                const formattedErrors = {}
                errors.forEach((error) => {
                    formattedErrors[error.field] = error.message
                });
                this.setState({
                    errors: formattedErrors,
                    loading: false,
                })
            });

    }

    render() {
        return (
            <div className="mh-fullscreen bg-img center-vh p-20"
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
                <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
                    <h5 className="text-uppercase text-center">Login</h5>
                    <br/><br/>
                    <form onSubmit={this.onSubmitClick}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" name="username"
                                   onChange={this.onChangeHandler} value={this.state.username}/>
                            {
                                this.state.errors.username &&
                                <small className="text-danger">
                                    {
                                        this.state.errors.username
                                    }
                                </small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="password"
                                   onChange={this.onChangeHandler} value={this.state.password}/>
                            {
                                this.state.errors.password &&
                                <small className="text-danger">
                                    {
                                        this.state.errors.password
                                    }
                                </small>
                            }
                        </div>
                        <div className="form-group flexbox py-10">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" defaultChecked/>
                                <span className="custom-control-indicator"/>
                                <span className="custom-control-description">Remember me</span>
                            </label>
                            <Link className="text-muted hover-primary fs-13" to="#">Forgot password?</Link>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-bold btn-block btn-primary"
                                    type="submit"
                                    disabled={this.state.loading}>
                                {this.state.loading ? <img src={loadingGif} alt="" className="w-20"/>: "Login"}
                            </button>
                        </div>
                    </form>
                    <hr className="w-30"/>
                    <p className="text-center text-muted fs-13 mt-20">Don't have an account? <Link
                        to={'/account/signup'}>Sign
                        up</Link></p>
                </div>
            </div>
        );
    }


}

export default LoginForm;