import React from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import "./form.css";

export default function Form({ handleChange, handleSubmit, newTask }) {
  return (
    <form onSubmit={handleSubmit} className="form" action="#">
      <input onChange={handleChange} type="text" value={newTask} />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

// Caso o newTask nao fosse obrigatório(requerido) se usa defaultProps pra declarar um valor
// Form.defaultProps = {
//   newTask: '',
// }

// propTypes é quando se declara as props como algo necessário e obrigatorio, o linter obriga a se declarar
Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired
};
