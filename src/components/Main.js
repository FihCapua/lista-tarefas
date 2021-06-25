import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  state = {
    newTask: "",
    tarefas: ["fazer Café", "beber Água", "Estudar"]
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value
    });
  };

  render() {
    const { newTask, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas </h1>

        <form className="form" action="#">
          <input onChange={this.handleChange} type="text" value={newTask} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa) => (
            <li key={tarefa}>
              {tarefa}
              <div>
                <FaEdit className="edit" />
                <FaWindowClose className="delete" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
