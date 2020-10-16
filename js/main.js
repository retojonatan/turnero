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
      // docFecha.collection('Clientes').doc('8hs').get().then(function (respuesta) {
      //   console.log(respuesta.data());
      // });
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
      docFecha.set({ created: new Date });
      docFecha.collection('Clientes').doc('Created').set({ Created: true }, { merge: true })
      .catch(function (error) {
        console.error('Hubo un error al crear la fecha:', error);
      })
    }
  }).catch(function(error) {
      console.log("Error al obtener el documento:", error);
  });  
}

function showHorario(e) {
  limpiarHoras(horarioTurno)
  var formulario = document.getElementsByClassName('horarios')[0];
  if (formulario.classList.contains('d-none')){
    formulario.classList.add('d-block');
    formulario.classList.remove('d-none');
  }
  cargarHorarios(e.target.value);
}

function showDatos() {
  var formDatos = document.getElementsByClassName('datos')[0];
  if (formDatos.classList.contains('d-none')){
    formDatos.classList.add('d-block');
    formDatos.classList.remove('d-none');
  }
}

function registrar(e) {
  e.preventDefault();
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
  }
  console.log(datosForm);

  var docFecha = ccjTurnos.doc(fecha);
  docFecha.get().then(function (doc) {
    if (doc.exists) {
      docFecha.collection('Clientes').doc(hora).set(datosForm, { merge: true })
      .catch(function (error) {
        console.error('Hubo un error al guardar los datos:', error);
      })
    } else {
      console.log('esto no tendria que verse')
    }
  }).catch(function(error) {
      console.log("Error al obtener el documento:", error);
  });
  e.target.reset();
}

function limpiarHoras(opcionesHorarios) {
  Array.from(opcionesHorarios).forEach(option => option.removeAttribute('disabled'));
}