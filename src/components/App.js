import React, { Component } from 'react';
import './app.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div data-test="component-app"></div>
    );
  }
}