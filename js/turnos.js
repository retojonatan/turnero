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

ccjTurnos.get().then((consulta) => {
  consulta.docs.forEach(doc => {
    renderFechas(doc);
  })
})

const tabla = document.querySelector('#tablaTurnos');

function renderFechas(doc) {
  var fechaDB = ccjTurnos.doc(doc.id);
  if (compararFecha(fechaDB.id)) {
    fechaDB.get().then(function (doc) {
      fechaDB.collection('Clientes').get().then(function (horariosDB) {
        horariosDB.forEach(function (horaDB) {
          if (horaDB.id !== 'Created') {
            let tbody = document.createElement('tbody');
            let fila = document.createElement('tr');
            let td_fecha = document.createElement('td');
            let td_hora = document.createElement('td');
            let td_nombre = document.createElement('td');
            let td_telefono = document.createElement('td');
            let td_mail = document.createElement('td');
            td_fecha.textContent = doc.id;
            td_hora.textContent = horaDB.id;
            td_nombre.textContent = horaDB.get('Nombre');
            td_telefono.textContent = horaDB.get('Telefono');
            td_mail.textContent = horaDB.get('Mail');
            fila.appendChild(td_fecha);
            fila.appendChild(td_hora);
            fila.appendChild(td_nombre);
            fila.appendChild(td_telefono);
            fila.appendChild(td_mail);
            tbody.appendChild(fila)
            tabla.appendChild(tbody);
          }
        })
      })
    })
  }
}

function compararFecha(fecha) {
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth() + 1;
  var yyyy = hoy.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  fechaArray = fecha.split('-');
  fechaDD = fechaArray[0];
  fechaMM = fechaArray[1];
  fechaYYYY = fechaArray[2];
  if (fechaYYYY >= yyyy) {
    if (fechaMM >= mm) {
      return fechaDD >= dd;
    }
  }
}