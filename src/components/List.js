import React, { Component } from 'react';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: []
    };
  }

  renderList = () => {
    let list = [];
    let { activeList } = this.props;
    if (activeList && activeList.length > 0) {
      activeList.forEach((item, index) => {
        list.push(
          <div data-test="todo-item" key={index}>
            {item.name}
          </div>
        )
      });
    }
    return list;
  };

  render() {
    return (
      <div data-test="component-list">
        <h1>List</h1>
        {this.renderList()}
      </div>
    )
  }
}