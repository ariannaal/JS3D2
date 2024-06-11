// nodi degli elementi che ci serviranno

// form
const form = document.querySelector("form");

// i campi input
const inputImg = document.getElementById("event-img");
const inputName = document.getElementById("event-name");
const inputDate = document.getElementById("event-date");

// contenitore per le card
const cardRow = document.getElementById("card-row");

// area di memoria locale che salva gli eventi dopo averli creati
let events = [];

class AgendaEvent {
  constructor(img, name, date) {
    this.eventImg = img;
    this.eventName = name;
    this.eventDate = date;
  }
}

const removeCol = event => {
  // la colonna da cui è nato l'evento (quella che vogliamo rimuovere)
  const col = event.currentTarget;

  const existingAppointments = JSON.parse(localStorage.getItem("events-memory")); // otteniamo l'array di oggetti dallo storage

  // andiamo a cercare un dato nella colonna per confrontarlo con i dati nell'array per trovare l'elemento corrispondente ed eliminarlo:

  // selezioniamo l'h5 della colonna cliccata
  const h5 = col.querySelector("h5");
  // prendiamo il suo testo
  const eventNameOfClickedCard = h5.innerText;

  // confrontiamo il testo con l'eventName di tutti gli oggetti nell'array, uno di loro avrà corrispondenza e il metodo findIndex ci dirà in che posizione è
  const indexFound = existingAppointments.findIndex(app => app.eventName === eventNameOfClickedCard);
  // a questo punto se index non è -1 abbiamo trovato lo stesso elemento da eliminare anche nell'array

  if (indexFound !== -1) {
    // procediamo con l'eliminazione
    existingAppointments.splice(indexFound, 1);

    // quest'azione si ripete ad ogni click sulle card, se l'array existingAppointments contiene ancora elementi allora andiamo ad
    // aggiornare il vecchio array salvato con l'attuale ( vedi else )
    // capiterà che ad un certo punto avremo finito gli elementi da eliminare...
    if (existingAppointments.length === 0) {
      // in quel caso non servirà aggiornare il dato "events-memory" ma potremmo eliminarlo
      localStorage.removeItem("events-memory");
      // e visualizzare di nuovo un alert
      generateAlert();
    } else {
      // qui stiamo aggiornando il vecchio array salvato con quello in cui abbiamo eliminato un elemento
      localStorage.setItem("events-memory", JSON.stringify(existingAppointments));
    }
  }
  // a questo punto, dopo aver gestito il localStorage possiamo anche rimuovere l'elemento dal DOM
  col.remove();
};

// funzione che gestisce l'inserimento dell'alert nella pagina
const generateAlert = () => {
  const container = document.querySelector(".container");
  // creazione dell'elemento alert
  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-info");
  alert.innerText = "Nessun elemento in memoria, creane uno tu, grazie :)";

  // inserimento nel contenitore
  container.appendChild(alert);
};

// funzione che genera una nuova colonna + card apartire dall'oggetto di un evento che arriva come parametro
const generateCard = obj => {
  const col = document.createElement("div");
  col.classList.add("col");

  // evento che gestisce la rimozione degli elementi, quando cliccati
  col.onclick = removeCol;

  col.innerHTML = `
      <div class="card">
          <img src=${obj.eventImg} class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${obj.eventName}</h5>
              <p class="card-text">${obj.eventDate}</p>
          </div>
      </div>`;

  cardRow.appendChild(col);
};

form.onsubmit = event => {
  event.preventDefault();

  const alert = document.querySelector(".alert"); // se alert è presente il querySelector ci ritorna il nodo di quell'elemento || null
  // se la variabile alert contiene un oggetto sarà truthy, se contiene null sarà falsy (non faremo nulla in quel caso)
  if (alert) {
    alert.remove();
  }
  // all'invio del form generiamo un nuovo oggetto
  const appointment = new AgendaEvent(inputImg.value, inputName.value, inputDate.value);
  // che inseriamo nella collezione eseterna "events"
  events.push(appointment);
  // inviamo l'intera collezione con gli oggetti, convertita in JSON, al localStorage
  localStorage.setItem("events-memory", JSON.stringify(events));
  // a questo punto aggiungiamo a schermo una nuova card
  generateCard(appointment);
  // e resettiamo i campi del form
  form.reset();
};

// quando la pagina verrà riaperta o ricaricata questa funzione si occuperà di ricavare di nuovo il dato degli appuntamenti in forma di array in formato JSON
// e ricreerà le card precedenti in autoamtico attraverso un ciclo sull'array degli appuntamenti
window.addEventListener("DOMContentLoaded", () => {
  const appointmentsFromStorage = localStorage.getItem("events-memory");
  if (appointmentsFromStorage) {
    // se ho trovato degli appuntamenti saremo qui dentro
    // e allora possiamo riconvertirli in array
    const appointmentsAsArray = JSON.parse(appointmentsFromStorage);
    events = appointmentsAsArray;

    //qui stiamo rigenerando le card a partire dai dati precedentemente salvati nello storage
    events.forEach(appointment => generateCard(appointment));
  } else {
    // siamo qui se non esistono ancora appuntamenti in memoria
    generateAlert();
  }
});