import React, { Component } from 'react';
import './app.scss';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: [],
      pendingList: [],
      item: "",
      description: "",
      recArmed: false,
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

  handleChange = (e) => {
    const target = e.target, name = target.name, value = target.value;
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let pendingList = this.state.pendingList.slice();
    let item = {
      name: this.state.item,
      description: this.state.description,
    };
    pendingList.push(item);
    this.setState({
      pendingList,
      item: "",
      description: ""
    })
  };

  handleRecord = () => {
    const recArmed = !this.state.recArmed;
    this.setState({
      recArmed,
      item: "",
      description: ""
    })
  }

  render() {
    return (
      <div data-test="component-app">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="item">
            item:
            <input disabled={!this.state.recArmed}
                   data-test="name-input"
                   onChange={this.handleChange}
                   type="text" name="item"
                   value={this.state.item}
            />
          </label>
          <label htmlFor="description">
            description:
            <input disabled={!this.state.recArmed}
                   data-test="desc-input"
                   onChange={this.handleChange}
                   type="text"
                   name="description"
                   value={this.state.description}
            />
          </label>
          <button data-test-id="submit-btn"
                  disabled={this.state.item === "" || this.state.description === ""}
                  type="submit">Submit</button>
        </form>
        <button data-test="rec-ctrl" onClick={this.handleRecord}>
          {this.state.recArmed ? "Stop recording" : "Start recording"}
        </button>
        <List activeList={this.state.activeList} />
      </div>
    );
  }
}