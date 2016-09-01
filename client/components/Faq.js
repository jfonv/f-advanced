/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* eslint-disable func-names, prefer-arrow-callback, no-undef, prefer-const, eqeqeq */
/* global localStorage */


import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { unauthorized: false, lockedOut: false };
  }

  create(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('http://localhost:9001/api/authenticate', { username, password })
    .then((res) => {
      localStorage.clear();
      localStorage.setItem('token', res.headers.authorization);
      browserHistory.push('/');
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data.message == 'Authentication Failed: Account Locked & GFY') {
        this.setState({ unauthorized: false, lockedOut: true });
        console.log('tricks');
      } else if (error.response.data.message == 'Authentication Failed: Bad credentials') {
        this.setState({ unauthorized: true, lockedOut: false });
        console.log('are somethign a whore does for money');
      }
    });
  }

  render() {
    let unauth = '';
    if (this.state.unauthorized) {
      unauth =
        (<div ref="unauthorized" id="unauthorized" style={{ color: 'red' }}>
          Sorry, this username or password is incorrect.
          Or GFY.
        </div>);
    }

    let lockedOut = '';
    if (this.state.lockedOut) {
      lockedOut =
        (<div ref="lockedOut" id="lockedOut" style={{ color: 'red' }}>
          Sorry, this account is locked out.
          Or you cant type.
        </div>);
    }
    return (
      <div>

        <h1>Faq You</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              {unauth}
              {lockedOut}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input ref="username" type="text" className="form-control" id="username" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref="password" type="password" className="form-control" id="password" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">
          </div>
        </div>

      </div>
    );
  }
}
