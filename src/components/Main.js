import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  state = {
    newTask: "",
    tarefas: []
  };

  handleSubmit = (e) => {
    e.preventDefault(); // bloqueia o envio do form
    const { tarefas } = this.state; // chama o array de tarefas do state
    let { newTask } = this.state; // chama a new Task que vai transformar o array de tarefas em string.
    newTask = newTask.trim(); // elimina os espaços do começo e do final do input

    if (tarefas.indexOf(newTask) !== -1) return; // caso o valor do input seja repetido não retorna nada

    const newsTasks = [...tarefas]; // aqui todos os valores (resultados) que forem pra o array (que estava vazio) tarefas serão copiados

    this.setState({
      tarefas: [...newsTasks, newTask] // tarefas serão iguais ao que for inserido nas novas tarefas (...rest copia as tarefas, newTask jogam os resultados das novas tarefas)
    });
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

        <form onSubmit={this.handleSubmit} className="form" action="#">
          <input onChange={this.handleChange} type="text" value={newTask} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit className="edit" />
                <FaWindowClose className="delete" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
