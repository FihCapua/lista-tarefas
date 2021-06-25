import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  state = {
    newTask: "",
    tarefas: [],
    index: -1 // estado de criação de tasks
  };

  handleSubmit = (e) => {
    e.preventDefault(); // bloqueia o envio do form
    const { tarefas, index } = this.state; // chama o array de tarefas do state
    let { newTask } = this.state; // chama a new Task que vai transformar o array de tarefas em string.
    newTask = newTask.trim(); // elimina os espaços do começo e do final do input

    if (tarefas.indexOf(newTask) !== -1) return; // caso o valor do input seja repetido não retorna nada

    const newsTasks = [...tarefas]; // aqui todos os valores (resultados) que forem pra o array (que estava vazio) tarefas serão copiados

    // Criando tarefas
    if (index === -1) {
      this.setState({
        tarefas: [...newsTasks, newTask], // tarefas serão iguais ao que for inserido nas novas tarefas (...rest copia as tarefas, newTask jogam os resultados das novas tarefas)
        newTask: ""
      });
    } else {
      // Editando tarefas
      newsTasks[index] = newTask;

      // configura o setState e volta pra o local inicial
      this.setState({
        tarefas: [...newsTasks],
        index: -1 // ja editado e ok
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value
    });
  };

  // Manipula os ícones de edit e delete
  handleEdit = (e, index) => {
    // ao editar o valor vai pra o input novamente - graças ao -1  la no state
    const { tarefas } = this.state; // seta(configura) o estado

    this.setState({
      index, // seleciona o index da tarefa
      newTask: tarefas[index] // seleciona a tarefa + o index
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state; // chama o estado tarefas
    const newTask = [...tarefas]; // copia o array de tarefas pra ser manipulado
    newTask.splice(index, 1); // splice remove 1 elemento do index assim que clicado

    this.setState({
      tarefas: [...newTask] // seta(configura) o estado e copia o que foi criado pra que o estado funcione
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
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, index)}
                  className="edit"
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
