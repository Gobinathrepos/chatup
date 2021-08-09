import React from 'react';

import firebase from '../../firebase/firebase';
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message
} from 'semantic-ui-react';


import { Link } from 'react-router-dom';

class Login extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };


  // help to display error in the form
  displayErrors = errors => errors.map((error, i) =>
    <p key={i}>
      {error.message}
    </p>
  );

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    // this help you to get the input and value of the user typed in
  };

  handleSubmit = event => {
    event.preventDefault();
    // it will prevent default action of the form

    if (this.isFormValid(this.state)) {
    this.setState({ errors: [], loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser);
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      });
    }
  };

  isFormValid = ({ email, password }) => email && password;


  handleInputError = (errors, inputName) => {
    return errors
      .some(error =>
        error.message.toLowerCase().includes('email'))
          ? 'error' : ''
    }

  render() {

  const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="teal" textAlign="center" >
            <Icon name="wechat" color="teal" />
            Login for Chatup
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment>
              <Form.Input
                name="email"
                icon="mail"
                placeholder="Enter your name"
                type="text"
                iconPosition="left"
                value={email}
                className={this.handleInputError(errors, 'email')}
                onChange={this.handleChange}
              />
              <Form.Input
                name="password"
                icon="lock"
                placeholder="Enter your password"
                type="password"
                iconPosition="left"
                value={password}
                className={this.handleInputError(errors, 'password')}
                onChange={this.handleChange}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : '' }
                size="large" color="teal">
                Login
              </Button>
            </Segment>
          </Form>

          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            I am not a user?
            <Link to="/register">
              Register
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login;
