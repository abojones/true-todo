import React, { Component } from 'react';
import ListItem from '../ListItem/ListItem'

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderList = () => {
    let list = [];
    let { activeList } = this.props;
    if (activeList && activeList.length > 0) {
      activeList.forEach((item, index) => {
        list.push(
          <ListItem name={item.name}
                    desc={item.desc} data-test="todo-item"
                    id={item.id}
                    key={index}
                    recArmed={this.props.recArmed}
                    handleEdit={this.props.handleEdit}
                    remove={item.remove}
                    item={item}
                    dateCreated={item.dateCreated}
          />
        )
      });
    }
    return list;
  };

  render() {
    return (
      <div className="list" data-test="component-list">
        <h1>List</h1>
        {this.renderList()}
      </div>
    )
  }
}