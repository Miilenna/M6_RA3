// Variables
let nom = localStorage.getItem("nom"); 
let punts = localStorage.getItem("partida"); 
let infoNavegador = navigator.userAgent;
let dades = document.getElementById("dades"); 
const puntsJoc = document.getElementById("puntsJoc"); 
let puntsActuals = 0; 
let jugador = document.getElementById("jugador"); 
let finestra = ""; 
let instruccionsJoc = document.getElementById("instruccions"); 

// Actualiza la puntuación en pantalla cuando cambia en localStorage
window.addEventListener('storage', (event) => {
    if (event.key === 'puntsActuals') {
        puntsJoc.textContent = event.newValue; // Actualiza la puntuación
    }
});

// Evento para abrir la ventana de instrucciones
instruccionsJoc.addEventListener("click", instruccions);

// Muestra el mejor jugador y su puntuación
dades.textContent = `${localStorage.getItem('millorJugador') || "Desconegut"} - PUNTS: ${localStorage.getItem('millorPuntuacio') || 0} punts`;
jugador.textContent = nom; // Muestra el nombre del jugador

// Variables para el juego de memoria
let cartasEmparejadas = []; // Cartas que ya han sido emparejadas
const cuadrados = document.getElementById("cuadrados"); 
const lletraCarta = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J']; // Letras para las cartas
const cartaAleatoria = lletraCarta.sort(() => 0.5 - Math.random()); // Mezcla aleatoria de las cartas

// Crea las cartas y añade el evento para voltearlas
cartaAleatoria.forEach(value => {
    const carta = document.createElement("div");
    carta.classList.add("carta"); // Clase para el estilo de carta
    carta.dataset.value = value; // Almacena el valor de la carta
    carta.addEventListener("click", volta); // Evento al hacer clic para voltear la carta
    cuadrados.appendChild(carta); // Añade la carta al contenedor
});

let primeraCarta = null; // Primera carta seleccionada
let segonaCarta = null; // Segunda carta seleccionada

// Función para voltear la carta
function volta() {
    // Impide voltear la carta si ya está emparejada o si hay dos cartas volteadas
    if (this.classList.contains("voltaDonada") || (primeraCarta && segonaCarta)) return;

    this.classList.add("voltaDonada"); // Añade clase para indicar que la carta está volteada
    this.textContent = this.dataset.value; // Muestra el valor de la carta

    if (!primeraCarta) {
        primeraCarta = this; // Guarda la primera carta seleccionada
    } else {
        segonaCarta = this; // Guarda la segunda carta seleccionada
        verificar(); // Verifica si hay coincidencia entre las dos cartas
    }
}

// Función para abrir una ventana de las instrucciones del juego
function instruccions() {
    finestra = window.open("instruccions.html", "Instruccions del Joc", "width=400,height=400");
}

// Canal de comunicación para el estado del juego entre ventanas/pestañas
const channel = new BroadcastChannel('gameChannel');

// Función para verificar si las cartas emparejadas son iguales
function verificar() {
    if (primeraCarta.dataset.value === segonaCarta.dataset.value) {
        puntsActuals += 10;
        puntsJoc.textContent = puntsActuals;
        localStorage.setItem('puntsActuals', puntsActuals);

        // Envía mensaje con la puntuación actual a otras ventanas del canal
        channel.postMessage({
            jugador: nom,
            puntuacio: puntsActuals
        });

        // Añade las cartas emparejadas al array
        cartasEmparejadas.push(primeraCarta, segonaCarta);

        // Verifica si todas las cartas están emparejadas
        if (cartasEmparejadas.length === cartaAleatoria.length) {
            window.location.href = 'finalitzat.html'; 
            channel.postMessage({
                jugador: nom,
                puntuacio: puntsActuals,
                estat: 'Partida finalitzada'
            });
        }

        // Actualiza la mejor puntuación si la puntuación actual es mayor
        const millorPuntuacio = localStorage.getItem('millorPuntuacio') || 0;
        if (puntsActuals > millorPuntuacio) {
            localStorage.setItem('millorPuntuacio', puntsActuals);
            localStorage.setItem('millorJugador', nom);
        }

        resetearJoc(); // Reinicia el estado de las cartas seleccionadas
    } else {
        // Si no coinciden, resta puntos
        puntsActuals -= 3;
        if (puntsActuals < 0) {
            puntsActuals = 0;
        }
        puntsJoc.textContent = puntsActuals;
        localStorage.setItem('puntsActuals', puntsActuals);

        // Envía mensaje de actualización de puntuación al canal
        channel.postMessage({
            jugador: nom,
            puntuacio: puntsActuals
        });

        // Esconde las cartas después de un corto intervalo
        setTimeout(() => {
            primeraCarta.classList.remove("voltaDonada");
            segonaCarta.classList.remove("voltaDonada");
            primeraCarta.textContent = "";
            segonaCarta.textContent = "";
            resetearJoc(); // Reinicia el estado de las cartas seleccionadas
        }, 700);
    }
}

// Función para reiniciar el estado de selección de cartas
function resetearJoc() {
    primeraCarta = null;
    segonaCarta = null;
}

// Cambia el color de fondo según el navegador
if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#a4eda5"; 
} else if (infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#ffa500"; 
}
