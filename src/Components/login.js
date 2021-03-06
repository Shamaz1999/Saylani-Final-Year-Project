import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends Component {

    state = {
        email: "",
        password: "",
        isLoggedIn: false
    }

    verify = () => {
        if (this.state.email === "") {
            toast('Email is required!', {
                className: 'logout-toast',
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                closeButton: false,
            });
            const input = this.refs.email;
            input.focus();
            return false
        } else
            if (this.state.password === "") {
                toast('Password is required', {
                    className: 'logout-toast',
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    closeButton: false,
                });
                const input = this.refs.password;
                input.focus();
                return false
            } else {
                var option = {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch('/login', option)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({ isloggedin: true })
                        localStorage.setItem('user', JSON.stringify(data))
                        this.props.dispatch({ type: 'Add_user', payload: data })
                        this.props.history.push("/home")
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({ isLoggedIn: false })
                        toast('Something Went Wrong!', {
                            className: 'logout-toast',
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            closeButton: false,
                        });
                        toast('Please make sure you are entering the right credentials', {
                            className: 'logout-toast',
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            closeButton: false,
                        });
                    })

            }


    }
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.verify();
        }
    }


    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return <Redirect to="/" />
        }

        return (
            <div className="main-login text-color">
                <div className="login-form" id="login-form">
                    <div className="display-4 login-page-heading">
                        Login to Your Account!
                        </div>
                    <div className="tabs-shadow login-form-wrapper">
                        <div className="login-form-container special">
                            <div className="form-group">
                                <label className="signup-label" htmlFor="loginEmail"><b>Email Address</b> <span className="required">*</span></label>
                                <input type="email" name="login-email" id="loginEmail" onChange={e => this.setState({ email: e.target.value })} onKeyUp={this.handleKeyUp} ref="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label className="signup-label" htmlFor="loginPassword" ><b>Password</b> <span className="required">*</span></label>
                                <input type="password" name="login-pass" id="loginPassword" onChange={e => this.setState({ password: e.target.value })} onKeyUp={this.handleKeyUp} ref="password" className="form-control" placeholder="Enter Password" />
                            </div>
                            <div className="login-btn-container">
                                <div>
                                    <Button onClick={this.verify} type="button" bsPrefix="btn login-btn postAd-submit-btn">Submit</Button>
                                </div>
                                <div>
                                    <Link className="login-signup-page-swap" to="/signup">Don't have an account! Create one now.</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        user: store.userReducer
    }
}
export default connect(mapStateToProps)(Login);