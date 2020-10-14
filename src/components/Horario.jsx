import React, { Component } from 'react';
import './Horario.css';

class Horario extends Component {
  constructor(props) {
    super(props);
    this.fechaId = props.fechaId;
    this.dia = props.dia;
  }

  render() {
    return (
      <option value={this.fechaId}>
        {this.dia}
      </option>
    );
  }
}

export default Horario;