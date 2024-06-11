

function increment() {
    counter++
    sessionStorage.setItem('counter', counter); //salva il nuovo valore in sessionStorage
    document.getElementById("seconds").textContent = counter;
}

// All'avvio della pagina recupera il conto OPPURE inizia da zero se non c'è valore dentro aslla sessionStorage
let counter = parseInt(sessionStorage.getItem('counter')) || 0;


setInterval(function () {

    increment();
    console.log(counter);

}, 1000);







