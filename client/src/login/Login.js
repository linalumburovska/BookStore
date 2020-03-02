import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Route } from "react-router-dom";

import './Login.css';

import AllBooks from "../allBooks/AllBooks";

/* Constants with hardcoded email and password */
export const EMAIL = 'lina@gmail.com';
export const PASSWORD = 'Lina123@';

/* Login component form with email and password for the certain user, added validation for the password */
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        /* Check if password is validated and if not show errors */
        const errors = this.validate(email, password);
        if (errors.length > 0) {
            this.setState({
                errors: errors
            });
            return;
        }
        /* If validation passes, route to AllBooks component */
        this.props.history.push('/allBooks');
        localStorage.setItem('loggedIn', true);
        return <Route to="/allBooks" component={AllBooks} />

    }

    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    validate(email, password) {
        const errors = [];
        /* Validate password: 6 characters with min one uppercase, one number and one special character */

        /* Check if empty */
        if(email==='' || password==='') {
            errors.push("Email and password must not be empty");
        } else if(password.length < 6) {
            /* Check its length */
            errors.push("Password must be at least six characters");
        } else if(!(new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$").test(password))) {
            /* Check required characters */
            errors.push("Password must have at least one uppercase, one number and one special character")
        } else if (!(email === EMAIL && password === PASSWORD)) {
            /* Check if the email and password are correct */
            errors.push("Invalid email or password");
        }
        return errors;
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <h1 className="text-center margin-top">Welcome to our book store!</h1>
                <Form className="w-50 mx-auto margin-top" onSubmit = {this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" value = {this.state.email} onChange={this.handleChangeEmail}  />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" value = {this.state.password} onChange = {this.handleChangePassword} />
                    </Form.Group>
                    {errors.map(error => (
                        <Alert variant="danger" key={error}>{error}</Alert>
                    ))}
                    <Button variant="info" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Login;