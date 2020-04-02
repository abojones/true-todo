import React, { Component } from 'react';
import './app.scss';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: [],
      pendingList: []
    }
  }

  componentDidMount() {
    const data = localStorage.getItem('items');
    const activeList = JSON.parse(data);
    if (activeList && activeList.length > 0) {
      this.setState({
        activeList
      })
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <List activeList={this.state.activeList} />
      </div>
    );
  }
}