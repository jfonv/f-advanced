/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* global localStorage */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.refresh = this.refresh.bind(this);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, exercise: {} };
  }
/*
  componentWillMount() {
    axios.get('/api/exercises', { headers: { authorization: this.state.authorization } })
    .then((rsp) => {
      this.setState({ exerciseList: rsp.data.exercises });
    });
  }
*/
  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/exercises', { headers: { authorization: this.state.authorization } })
      .then(res => {
        this.setState({ profile: res.data });
      });
  }
  create(e) {
    e.preventDefault();

    const exerciseType = this.refs.exerciseType.value;
    const quantity = this.refs.quantity.value;
    const duration = this.refs.duration.value;
    const calories = this.refs.calories.value;
    axios.post('http://localhost:9001/api/exercises/create', { exercise: exerciseType, quantity, duration, calories }, { headers: { authorization: this.state.authorization } })
    .then((res) => {
      localStorage.clear();
      localStorage.setItem('token', res.headers.authorization);
      browserHistory.push('/exercises');
    })
    .catch(() => {
      // notify user login failed
    });
  }

  render() {
    return (
      <div>
        <h1>Enter an Exercise</h1>
        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="exerciseType">Select Exercise</label>
                <select ref="exerciseType" type="text" className="form-control" id="exerciseType">
                  <option value="bike">Bike</option>
                  <option value="lift">Lift</option>
                  <option value="run">Run</option>
                  <option value="swim">Swim</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input ref="quantity" type="number" className="form-control" id="quantity" />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input ref="duration" type="text" className="form-control" id="duration" />
              </div>
              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input ref="calories" type="text" className="form-control" id="calories" />
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
