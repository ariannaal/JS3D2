// Classe per creare oggetti ListNames
class ListNames {
    constructor(name) {
        this.eventName = name;
    }
}

// Prendo il contenitore dei nomi salvati
const savedValues = document.getElementById("savedValue");

// Creo un'area di memoria locale che salva gli eventi dopo averli creati
let names = [];

// Aggiungo un event listener per DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
    // Recupero i nomi salvati nel localStorage
    const namesFromStorage = localStorage.getItem("names-memory");
    if (namesFromStorage) {
        // Converto i dati da JSON a un array di oggetti
        names = JSON.parse(namesFromStorage);

        // Rigenero le h5 a partire dai dati precedentemente salvati
        names.forEach(user => generateH5(user));
    }

    // Seleziono il form e aggiungo un event listener per la submission
    const form = document.querySelector("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        getNames();
    };

    // Aggiungo un event listener per il pulsante di eliminazione
    const deleteButton = document.querySelector(".btn-danger");
    deleteButton.onclick = hideNames;
});

// Funzione per ottenere i nomi dal form e salvarli
function getNames() {
    // Prendo il campo input tramite id
    const inputName = document.getElementById("event-name");

    // All'invio del form generiamo un nuovo oggetto
    const user = new ListNames(inputName.value);

    // Inserisco il valore che ricevo nell'array "names"
    names.push(user);

    // Invio l'intera collezione con gli oggetti, convertita in JSON, al localStorage
    localStorage.setItem("names-memory", JSON.stringify(names));

    // Genero un nuovo h5 per il nome aggiunto
    generateH5(user);

    // Resetta il campo input dopo l'invio
    inputName.value = '';
}

// Funzione per generare e aggiungere un h5 al DOM
function generateH5(obj) {
    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = obj.eventName;

    savedValues.appendChild(h5);
}

// Funzione per nascondere tutti i nomi dal DOM
function hideNames() {
    while (savedValues.firstChild) { // ciclo while verifica l'esistenza di elementi figli
        savedValues.removeChild(savedValues.firstChild);
    }
}