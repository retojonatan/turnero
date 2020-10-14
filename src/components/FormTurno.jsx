import React, { Component } from 'react';
import './FormTurno.css';

class FormTurno extends Component {
  constructor(props) {
    super(props);
    this.agendarTurno = this.agendarTurno.bind(this);
  }

  agendarTurno() {
    console.log(this.datos.value);
    this.datos.value = '';
  }

  render() {
    return (
      <div className='form'>
        <input
          ref={datos => { this.datos = datos }}
          type="text"
          placeholder='Introduzca su email'
        // onChange=''
        />
        <button
          onClick={this.agendarTurno}
          className='btn-turno'
        >
          Agendar Turno
</button>
      </div >
    );
  }
}

export default FormTurno;