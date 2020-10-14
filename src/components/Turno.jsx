import React, { Component } from 'react';
import './Turno.css';

class Turno extends Component {
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

export default Turno;