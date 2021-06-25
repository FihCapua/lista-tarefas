import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  state = {
    newTask: ""
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value
    });
  };

  render() {
    const { newTask } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas </h1>

        <form className="form" action="#">
          <input onChange={this.handleChange} type="text" value={newTask} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>
      </div>
    );
  }
}
