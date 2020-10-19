// Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAOTu86QfLRu3eLJD_Mc_nfKZncDqbNy30",
  authDomain: "ccj-turnos.firebaseapp.com",
  databaseURL: "https://ccj-turnos.firebaseio.com",
  projectId: "ccj-turnos",
  storageBucket: "ccj-turnos.appspot.com",
  messagingSenderId: "649906719106",
  appId: "1:649906719106:web:599b2e7b9a8f7f1674a79b",
  measurementId: "G-Q3HD6YGSG9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const ccjTurnos = db.collection('ccj-turnos');

const horarioTurno = document.getElementById('horarioTurno');
horarioTurno.addEventListener('change', (e) => showDatos(e));
const registroForm = document.getElementById('formulario');
registroForm.addEventListener('submit', (e) => registrar(e));

function cargarHorarios(fechaElegida) {
  var docFecha = ccjTurnos.doc(fechaElegida);
  docFecha.get().then(function (doc) {
    if (doc.exists) {
      docFecha.collection('Clientes').get().then(function (horariosDB) {
        horariosDB.forEach(function (horaDB) {
          Array.from(horarioTurno.options).forEach(function (opcion) {
            if (opcion.value === horaDB.id) {
              opcion.setAttribute('disabled', 'disabled');
            }
          });
        });
      });
    } else {
      docFecha.set({
        created: new Date
      });
      docFecha.collection('Clientes').doc('Created').set({
          Created: true
        }, {
          merge: true
        })
        .catch(function (error) {
          console.error('Hubo un error al crear la fecha:', error);
        })
    }
  }).catch(function (error) {
    console.log("Error al obtener el documento:", error);
  });
}

function showHorario(e) {
  limpiarHoras(horarioTurno);
  cargarHorarios(e.target.value);
  var formulario = document.getElementsByClassName('horarios')[0];
  if (formulario.classList.contains('d-none')) {
    formulario.classList.add('d-block');
    formulario.classList.remove('d-none');
  }
}

function limpiarHoras(opcionesHorarios) {
  Array.from(opcionesHorarios).forEach(option => option.removeAttribute('disabled'));
}

function showDatos() {
  var formDatos = document.getElementsByClassName('datos')[0];
  if (formDatos.classList.contains('d-none')) {
    formDatos.classList.add('d-block');
    formDatos.classList.remove('d-none');
  }
}

function registrar(e) {
  var fecha = e.target.fechaTurno.value;
  var hora = e.target.horarioTurno.value;
  var nombre = e.target.nombre.value;
  var tel = e.target.tel.value;
  var mail = e.target.mail.value;
  var motivo = e.target.motivo.value;
  var datosForm = {
    Nombre: nombre,
    Mail: mail,
    Telefono: tel,
    Motivo: motivo,
    Estado: 'Activo',
  }
  var docFecha = ccjTurnos.doc(fecha);
  if (tieneTurno(mail)) {
    console.log('tiene turno')
  } else {
    e.preventDefault();
    docFecha.get().then(function (doc) {
      if (doc.exists) {
        docFecha.collection('Clientes').doc(hora).set(datosForm, {
            merge: true
          })
          .catch(function (error) {
            console.error('Hubo un error al guardar los datos:', error);
          })
      }
    }).catch(function (error) {
      console.log("Error al obtener el documento:", error);
    });
    $('#modalOk').modal('show');
    e.target.reset();
  }
}

async function consulta() {
  var mail = "silvanaherrera737@gmail.com"
  var existeTurno = false;
  try {
    await ccjTurnos.get().then((fechas) => {
      fechas.docs.forEach(fecha => {
        var fechaDB = ccjTurnos.doc(fecha.id);
        fechaDB.collection('Clientes')
          .where("Mail", "==", mail)
          .where("Estado", "==", "Activo")
          .get()
          .then((consulta) => {
            consulta.forEach(function (doc) {
              console.log(doc.data());
              existeTurno = true;
            })
          })
          .catch(function (error) {
            console.log(error);
          })
      })
    })
    console.log("tiene turno:" + existeTurno)
    return existeTurno;
  } catch (e) {
    console.error(error);
  }
}

async function tieneTurno(mail) {
  try {
    let resultado = await ccjTurnos.get().then((fechas) => {
      fechas.docs.forEach(async function (fecha) {
        var fechaDB = await ccjTurnos.doc(fecha.id);
        fechaDB.collection('Clientes').get().then(async function (horariosDB) {
          horariosDB.forEach(function (horaDB) {
            if ((horaDB.id !== 'Created') && (horaDB.get('Mail') === mail) && (horaDB.get('Estado') === 'Activo')) {
              return resultado = true
            }
          })
        })
      })
    })
  } catch (e) {
    console.error(e)
  }
}