import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Spinner from './Spinner';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import firebase from 'firebase';

import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/reducers';
import { setUser, clearUser } from './action/action';

// creating a global state for user so that it can be access anywhere

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    console.log(this.props.isLoading);
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.setUser(user);
        this.props.history.push("/");
        // to use history property outside of route we use HOF
      } else {
        this.props.history.push("/login");
        clearUser()
      }
    });
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      // we are route this with component listener and mount it with executable mount
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
    )
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateFromProps, {setUser, clearUser}) (Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);
