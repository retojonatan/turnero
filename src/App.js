import React, { Component } from 'react';
import './App.css';
import Turno from './components/Turno';
import Horario from './components/Horario';
import FormTurno from './components/FormTurno';
import './config/firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      turnos: [
        {
          fechaId: 1,
          dia: "5-10-2020",
          lleno: false,
          horarios: [
            {
              turnoId: 1,
              hora: "9:00",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
            {
              turnoId: 2,
              hora: "9:15",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
            {
              turnoId: 3,
              hora: "9:30",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
          ]
        },
        {
          fechaId: 2,
          dia: "7-10-2020",
          lleno: false,
          horarios: [
            {
              turnoId: 1,
              hora: "9:00",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
            {
              turnoId: 2,
              hora: "9:15",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
            {
              turnoId: 3,
              hora: "9:30",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
          ]
        },
        {
          fechaId: 3,
          dia: "10-10-2020",
          lleno: false,
          horarios: [
            {
              turnoId: 1,
              hora: "9:00",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
            {
              turnoId: 2,
              hora: "9:15",
              contacto: "",
              ocupado: false,
              reservadoPor: ""
            },
          ]
        },
      ],
      mostrarHorario: false,
      fechaElegida: '',
    };
  }

  componentDidMount() {
    const { turnos } = this.state;
    this.setState({ turnos })
  }

  mostrarHorarios = (event) => {
    event.preventDefault();
    this.setState({
      mostrarHorario: true,
      fechaElegida: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Entrega de turnos CCJ</h1>
        </div>
        <div className="content">
          <h1>Turnos disponibles</h1>
          <div className="turno">
            <label>Seleccione la fecha</label>
            <select name="turno"
              onChange={this.mostrarHorarios}
            >
              {
                this.state.turnos.map(turno => {
                  if (turno.lleno) {
                    return ('');
                  }
                  else {
                    return (
                      <Turno
                        dia={turno.dia}
                        key={turno.fechaId}
                      />
                    );
                  }
                })
              }
            </select>
          </div>
          {this.state.mostrarHorario &&
            <div className="turno">
              <label>Seleccione el horario</label>
              <select name='Horario'>
                {
                  this.state.turnos.forEach(turno => {
                    if (turno.dia === this.state.fechaElegida) {
                      turno.horarios.map(horario => {
                        return (
                          <Horario
                            horario={horario.hora}
                            key={horario.turnoId}
                          />
                        )
                      })
                    }
                    else {
                      return (
                        this.setState({
                          mostrarHorario: false
                        })
                      );
                    }
                  })
                }
              </select>
            </div>
          }
          <FormTurno

          />
        </div>
        <div className="footer">
          Footer CCJ
        </div>
      </div>
    );
  }

}

export default App;
