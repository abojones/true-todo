import React, { Component } from 'react';
import List from './List/List';
import _ from 'lodash'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: [],
      pendingList: [],
      item: "",
      desc: "",
      recArmed: false,
      rank: 0,
      play: false
    }
  }

  componentDidMount() {
    const data = localStorage.getItem('items');
    const pendingList = JSON.parse(data);
    if (pendingList && pendingList.length > 0) {
      this.setState({
        pendingList
      })
    }
  }

  handleChange = (e) => {
    const target = e.target, name = target.name, value = target.value;
    this.setState({
      [name]: value
    })
  };

  managePending = () => {
    const seen = new Set();
    let list = _.cloneDeep(this.state.pendingList).concat(_.cloneDeep(this.state.activeList));
    const pendingList = list.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate
    });
    return pendingList
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const pendingList = this.managePending(),
      rank = this.state.rank + 1;
    let id = 1;
    if (pendingList.length > 0) {
      id = pendingList.map((elem) => elem.id).sort()[pendingList.length-1] + 1;
    }
    let item = {
      name: this.state.item,
      desc: this.state.desc,
      dateCreated: new Date().toLocaleString(),
      id,
      rank,
      remove: false
    };
    pendingList.push(item);
    this.setState({
      pendingList,
      item: "",
      desc: "",
      rank
    });
    localStorage.setItem('items', JSON.stringify(pendingList))
  };

  handleEdit = (type, id, name="", desc="") => {

    const pendingList = this.managePending(),
      rank = this.state.rank + 1;
    const index = pendingList.map(elem => {
      return elem.id
    }).indexOf(id);
    switch(type) {
      case "edit":
        pendingList[index].desc = desc;
        pendingList[index].name = name;
        pendingList[index].rank = rank;
        break;
      case "remove":
        pendingList[index].remove = true;
        break;
      default:
        return;
    }
    this.setState({
      pendingList,
      rank
    });
    localStorage.setItem('items', JSON.stringify(pendingList))
  };

  handleRecord = () => {
    const recArmed = !this.state.recArmed;
    this.setState({
      recArmed,
      item: "",
      desc: ""
    })
  };

  handlePlay = () => {
    this.setState({
      activeList: [],
      play: true
    });

    let pendingList = _.cloneDeep(this.state.pendingList);
    pendingList.sort((a,b) => a.rank - b.rank);
    let unchanged = pendingList.filter((elem) => elem.rank === 0);
    pendingList = pendingList.filter((elem) => !elem.remove && elem.rank !== 0).concat(unchanged);
    let activeList = [];
    pendingList.forEach((item, index) => {
      if (!item.remove) {
        setTimeout(() => {
          item.rank = 0;
          activeList.push(item);
          this.setState({
            activeList
          })
        },(index+1) * 1000)
      }
    });
    this.setState({
      pendingList: [],
      rank: 0
    })
  };

  clearRecord = () => {
    this.setState({
      pendingList: [],
      activeList: [],
      rank: 0
    });
    localStorage.removeItem('items')
  };

  render() {
    return (
      <div className="app" data-test="component-app">
        <div className="form-container">
          <form className="app__form" onSubmit={this.handleSubmit}>
            <div className="form-field">
              <label htmlFor="item">
                Item:</label>
                <input disabled={!this.state.recArmed}
                       data-test="name-input"
                       onChange={this.handleChange}
                       type="text"
                       name="item"
                       value={this.state.item}
                />
            </div>
            <div className="form-field">
              <label htmlFor="desc">
                Description:</label>
                <textarea disabled={!this.state.recArmed}
                          data-test="desc-input"
                          onChange={this.handleChange}
                          name="desc"
                          value={this.state.desc}
                          required={true}
                />
            </div>
            <button data-test-id="submit-btn"
                    className="btn submit-btn"
                    disabled={this.state.item === "" || this.state.desc === ""}
                    type="submit">Add new item</button>
          </form>
          <button data-test="rec-ctrl"
                  className="btn btn--control"
                  onClick={this.handleRecord}>
            {this.state.recArmed ? "Stop recording" : "Start recording"}
          </button>
          <button data-test="play-btn"
                  className="btn btn--control"
                  disabled={this.state.recArmed || this.state.pendingList.length === 0}
                  onClick={this.handlePlay}
          >Play</button>
          <button data-test="clear-btn"
                  className="btn btn--control"
                  disabled={this.state.recArmed}
                  onClick={this.clearRecord}
          >Clear recording</button>
        </div>
        <List activeList={this.state.activeList}
              recArmed={this.state.recArmed}
              handleEdit={this.handleEdit}
              play={this.state.play}
        />
      </div>
    );
  }
}