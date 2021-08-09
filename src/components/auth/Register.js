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

import md5 from 'md5';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };

  isFormValid = () => {
    let errors = []; // we are assign an empty array
    let error;

    if (this.isFormEmpty(this.state)) {
      // throw error if the input is not fill off
      error = { message: 'Fill in all field'};
      this.setState({ errors: errors.concat(error) })

    } else if (!this.isPasswordValid(this.state)) {
      // throw error if the password are not same
      error = { message: 'Password is invalid'};
      this.setState({ errors: errors.concat(error) })

    } else {
      // if both condition does not pass then form is valid
      return true;
    }
  }

  isFormEmpty = ({ username, email, password, confirmpassword }) => {
    return !username.length || !email.length || !password.length || !confirmpassword.length;
  }

  isPasswordValid = ({ password, confirmpassword }) => {
    if (password.length < 6 || confirmpassword.length < 6) {
      return false;
    } else if (password !== confirmpassword) {
      return false;
    } else {
      return true;
    }
  }

  // display error in the form
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

    if (this.isFormValid()) {
    this.setState({ errors: [], loading: true })
    // we have clear the errors arr and setting the loading to true only when the registing the user this will avoid us to submit twice
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      // this is a promise method
      .then(createdUser => {
        console.log(createdUser);

        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar${md5(createdUser.user.email)}?d=identicon`
        })
        .then(() => {
          this.saveUser(createdUser).then(() => {
            console.log('user saved');
          })
        })
        .catch(err => {
          console.error(err);
          this.setState({ errors: this.state.errors.concat(err), loading: false });
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: this.state.errors.concat(err), loading: false });
    });
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid)
      .set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
      })
  }

  handleInputError = (errors, inputName) => {
    return errors
      .some(error =>
        error.message.toLowerCase().includes('email'))
          ? 'error' : ''
    }

  render() {
    const { username, email, password, confirmpassword, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="teal" textAlign="center">
            <Icon name="wechat" color="teal" />
            Register for Chatup
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment>
              <Form.Input
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Enter your name"
                type="text"
                value={username}
                onChange={this.handleChange}
              />

              <Form.Input
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Enter your email"
                type="email"
                value={email}
                // it'll display where the error is coming from
                className={this.handleInputError(errors, 'email')}
                onChange={this.handleChange}
              />

              <Form.Input
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Enter your password"
                type="password"
                value={password}
                className={this.handleInputError(errors, 'password')}
                onChange={this.handleChange}
              />

              <Form.Input
                name="confirmpassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Retype your password"
                type="password"
                value={confirmpassword}
                className={this.handleInputError(errors, 'password')}
                onChange={this.handleChange}
              />

              <Button
                disabled={loading}
                className={loading ? 'loading' : '' }
                color="teal" size="large">
                Register
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
            Already a user?
            <Link to="/login">
              Login
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register;
