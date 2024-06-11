// let counter = 0

function increment() {
    counter++
     sessionStorage.setItem('counter', counter); //salva il nuovo valore in sessionStorage
}

// All'avvio della pagina recupera il conto OPPURE inizia da zero se non c'è valore dentro aslla sessionStorage
let counter = parseInt(sessionStorage.getItem('counter')) || 0;

setInterval(function () {

    increment();
    console.log(counter);

}, 1000);

// function generatediv(obj) {
//     const div = document.createElement("div");
//     const seconds = document.getElementById("seconds");
//     div.className = "secondsDiv";
//     div.textContent = obj.counter;
//     seconds.appendChild(div);
// }





