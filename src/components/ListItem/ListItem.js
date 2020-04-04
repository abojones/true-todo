import React, { Component } from 'react';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      newName: "",
      newDesc: "",
      remove: props.remove,
      editable: false,
      opacity: 0,
      display: "none",
    }
  }

  componentDidMount() {
    this.setState({ display: 'block' });
    setTimeout(() =>
      this.setState({ opacity: 1 }), 10
    )
  }

  updateItem = (type) => {
    switch (type) {
      case "remove":
        this.props.handleEdit(type, this.props.id);
        this.setState({
          remove: true
        });
        break;
      case "edit":
        let name = this.props.name,
          desc = this.props.desc;
        this.state.newName !== "" ? name = this.state.newName : null;
        this.state.newDesc !== "" ? desc = this.state.newDesc : null;
        this.props.handleEdit(type, this.props.id, name, desc);
        this.setState({
          edited: true
        });
        break;
    }
    this.setState({
      newName: "",
      newDesc: ""
    })
  };

  handleChange = (e) => {
    const target = e.target, name = target.name, value = target.value;
    this.setState({
      [name]: value
    })
  };

  toggleEdit = () => {
    const editable = !this.state.editable;
    this.setState({
      editable
    })
  };

  render() {
    const hidden = this.props.recArmed && !this.state.remove && !this.state.edited && this.state.editable  ? "" : "hidden";
    const editsDisabled = !this.props.recArmed || this.state.remove || this.state.edited;
    const updateDisabled = this.state.newName === "" && this.state.newDesc === "";
    return (
      <div className="list-item"
           data-test="component-todo"
           style={{
             transition: 'all 0.5s ease',
             opacity: this.state.opacity,
             display: this.state.display
           }}
      >
        <div className="admin">
          <p>id: {this.props.id}</p>
          <p>Date created: {this.props.dateCreated}</p>
        </div>
        <p data-test="item-name">Name: {this.props.name}</p>
        <label data-test="edit-input"
               className={hidden}
               htmlFor="newName">
          New Name:
          <input name="newName"
                 type="text"
                 value={this.state.newName}
                 onChange={this.handleChange}
          />
        </label>
        <p data-test="item-desc">Description: {this.props.desc}</p>
        <label data-test="edit-input"
               className={hidden}
               htmlFor="newDesc">
          New description:
          <textarea name="newDesc"
                    type="text"
                    value={this.state.newDesc}
                    onChange={this.handleChange}
          />
        </label>
        <button data-test="edit-btn"
                disabled={updateDisabled}
                className="btn"
                onClick={() => this.updateItem("edit")}
        >Update Item</button>
        <button data-test="toggle-edit"
                disabled={editsDisabled}
                className="btn btn--control"
                onClick={this.toggleEdit}
        >{this.state.editable ? "Cancel" : "Edit"}</button>
        <button data-test="remove-btn"
                className="btn btn--control"
                disabled={editsDisabled}
                onClick={() => this.updateItem("remove")}
        >Remove item</button>
      </div>
    );
  }
}
