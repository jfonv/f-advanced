/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* eslint-disable func-names, prefer-arrow-callback, no-undef, prefer-const, eqeqeq */
/* global localStorage */

import React from 'react';
import axios from 'axios';
// import { browserHistory } from 'react-router';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    // this.create = this.create.bind(this);
    const authorization = localStorage.getItem('token');
    this.change = this.change.bind(this);
    this.state = { unauthorized: false, lockedOut: false, authorization, users: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:9001/api/users', { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.setState({ users: res.data.content });
      console.log('just in case', this.state.users);
    });
  }
  change() {

  }
  render() {
    if (this.refs.username1) { console.log(this.refs.username1.value, 'joejoejoe'); }
    let displayData = '';
    displayData = '';
    if (this.refs.username1 && this.refs.username1.value !== 0) {
      displayData = (<span>{this.state.users[this.refs.username1.value]}</span>);
    }
    return (
      <div>

        <h1>Little Admins Room</h1>

        <select ref="username1" id="username1" className="form-control" width="75">
          {this.state.users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
        </select>
        Enabled?: {displayData}
      </div>
    );
  }
}
