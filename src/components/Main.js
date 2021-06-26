import React, { Component } from "react";
import "./Main.css";
import Tasks from "./Tasks";
import Form from "./Form";

export default class Main extends Component {
  state = {
    newTask: "",
    tarefas: [],
    index: -1 // estado de criação de tasks
  };

  // DEPOIS ESSE - assim que os elementos forem montados vai salvar aqui
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  // PRIMEIRO ESSE - salvar as tarefas no cache do navegador
  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return; // verifica se o valor das tasks estao completos, e quando salvar guarda o array com os valores

    // Faz ação de transformar as tarefas em string p/ serem salvas
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault(); // bloqueia o envio do form
    const { tarefas, index } = this.state; // chama o array de tarefas do state
    let { newTask } = this.state; // chama a new Task que vai transformar o array de tarefas em string.
    newTask = newTask.trim(); // elimina os espaços do começo e do final do input

    if (tarefas.indexOf(newTask) !== -1) return; // caso o valor do input seja repetido não retorna nada

    if (tarefas.value === "") return;

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
        index: -1, // ja editado e ok
        newTask: ""
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

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />

        <Tasks
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
