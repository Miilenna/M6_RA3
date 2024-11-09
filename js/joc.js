// Obtener los valores de nombre y partida del almacenamiento local
let nom = localStorage.getItem("nom");
let punts = localStorage.getItem("partida");
let infoNavegador = navigator.userAgent;
let dades = document.getElementById("dades");
const puntsJoc = document.getElementById("puntsJoc");
let puntsActuals = 0;
let jugador = document.getElementById("jugador");
let finestra = "";
let instruccionsJoc = document.getElementById("instruccions");

window.addEventListener('storage', (event) => {
    if (event.key === 'puntsActuals') {
        puntsJoc.textContent = event.newValue;
    }
});

instruccionsJoc.addEventListener("click", instruccions);

// Mostrar el mejor jugador y su puntuación en el HTML
dades.textContent = `${localStorage.getItem('millorJugador') || "Desconegut"} - PUNTS: ${localStorage.getItem('millorPuntuacio') || 0} punts`;
jugador.textContent = nom;

let cartasEmparejadas = [];
const cuadrados = document.getElementById("cuadrados");
const lletraCarta = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'];
const cartaAleatoria = lletraCarta.sort(() => 0.5 - Math.random());

cartaAleatoria.forEach(value => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.value = value;
    carta.addEventListener("click", volta);
    cuadrados.appendChild(carta);
});

let primeraCarta = null;
let segonaCarta = null;

function volta() {
    if (this.classList.contains("voltaDonada") || (primeraCarta && segonaCarta)) return;

    this.classList.add("voltaDonada");
    this.textContent = this.dataset.value;

    if (!primeraCarta) {
        primeraCarta = this;
    } else {
        segonaCarta = this;
        verificar();
    }
}

function instruccions() {
    finestra = window.open("instruccions.html", "Instruccions del Joc", "width=400,height=400");
}

const channel = new BroadcastChannel('gameChannel');

function verificar() {
    if (primeraCarta.dataset.value === segonaCarta.dataset.value) {
        puntsActuals += 10;
        puntsJoc.textContent = puntsActuals;
        localStorage.setItem('puntsActuals', puntsActuals);

        channel.postMessage({
            jugador: nom,
            puntuacio: puntsActuals
        });

        cartasEmparejadas.push(primeraCarta, segonaCarta);

        if (cartasEmparejadas.length === cartaAleatoria.length) {
            window.location.href = 'finalitzat.html';
            channel.postMessage({
                jugador: nom,
                puntuacio: puntsActuals,
                estat: 'Partida finalitzada'
            });
        }

        const millorPuntuacio = localStorage.getItem('millorPuntuacio') || 0;
        if (puntsActuals > millorPuntuacio) {
            localStorage.setItem('millorPuntuacio', puntsActuals);
            localStorage.setItem('millorJugador', nom);
        }

        resetearJoc();
    } else {
        puntsActuals -= 3;
        if (puntsActuals < 0) {
            puntsActuals = 0;
        }
        puntsJoc.textContent = puntsActuals;
        localStorage.setItem('puntsActuals', puntsActuals);

        channel.postMessage({
            jugador: nom,
            puntuacio: puntsActuals
        });

        setTimeout(() => {
            primeraCarta.classList.remove("voltaDonada");
            segonaCarta.classList.remove("voltaDonada");
            primeraCarta.textContent = "";
            segonaCarta.textContent = "";
            resetearJoc();
        }, 700);
    }
}

function resetearJoc() {
    primeraCarta = null;
    segonaCarta = null;
}

if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#a4eda5";
} else if (infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#ffa500";
}
