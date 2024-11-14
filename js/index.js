// Variables
let nom = document.getElementById("nom"); 
let infoPartida = document.getElementById("partida");
let comencar = document.getElementById("començarPartida"); 
let borrar = document.getElementById("borrarPartida"); 
let infoNavegador = navigator.userAgent; // Información del navegador
let infoURL = location.href; // URL actual
let estatPartida = "En joc"; 
let jocIniciat = false; 
let jocAcabat = false; 
let punts = 0; 
let finestra = "";

// Muestra la información del navegador y la URL
document.getElementById("infoNavegador").textContent = infoNavegador;
document.getElementById("infoURL").textContent = infoURL;

// Almacena en localStorage el nombre del jugador y el estado de la partida
localStorage.setItem("nom", nom.value);
localStorage.setItem("partida", infoPartida.textContent);

// Eventos para los botones de comenzar y borrar partida
comencar.addEventListener("click", comencarPartida);
borrar.addEventListener("click", borrarPartida);

// Cambia el color de fondo de la página dependiendo del navegador
if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#ffa500"; 
} else if (infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#a4eda5"; 
}

// Función para iniciar la partida
function comencarPartida() {
    if (!jocIniciat) { 
        if (nom.value === "") { 
            alert("Has d'afegir un nom per poder començar a jugar");
        } else {
            jocIniciat = true;
            // Actualiza la información de la partida
            infoPartida.textContent = `NOM: ${nom.value}, PUNTS: ${punts}, ESTAT PARTIDA: ${estatPartida}`;
            document.cookie = "nom=" + nom.value; // Guarda el nombre en una cookie

            // Guarda el estado de la partida en localStorage
            localStorage.setItem("nom", nom.value);
            localStorage.setItem("partida", infoPartida.textContent);

            // Abre una nueva ventana para el juego
            finestra = window.open("joc.html");
        }
    } else if (jocAcabat) {
        return; // Si el juego ya ha terminado, no hace nada
    } else if (!finestra.closed) {
        finestra = window.open("joc.html");
        alert("Hi ha una partida començada"); 
    }
}

// Crea un canal de comunicación entre pestañas
const channel = new BroadcastChannel('gameChannel');

// Escucha mensajes del canal de comunicación
channel.addEventListener('message', (event) => {
    if (event.data) {
        const estatRecibido = event.data.estat || "En joc";
        // Actualiza la información de la partida con datos recibidos
        infoPartida.textContent = `NOM: ${event.data.jugador}, PUNTS: ${event.data.puntuacio}, ESTAT PARTIDA: ${estatRecibido}`;

        // Si el estado de la partida está finalizado
        if (estatRecibido === "Partida finalitzada") {
            jocAcabat = true;
            jocIniciat = false;
            localStorage.setItem("partida", infoPartida.textContent);
        }
    }
});

// Función para borrar la partida y restablecer valores
function borrarPartida() {
    // Elimina la información de la partida en localStorage
    localStorage.removeItem('nom');
    localStorage.removeItem('puntsActuals');
    localStorage.removeItem('colorFons');

    // Actualiza el mensaje de partida
    infoPartida.textContent = "No hi ha cap partida en joc";
    nom.value = "";
    jocIniciat = false;
    jocAcabat = false;

    // Cierra la ventana del juego si está abierta
    if (finestra && !finestra.closed) {
        finestra.close();
    }
}

// Evento que se activa al enfocar la ventana
window.addEventListener('focus', () => {
    if (finestra && finestra.closed && jocIniciat) {
        // Si la ventana del juego está cerrada y el juego había iniciado
        estatPartida = "Partida finalitzada";
        // Actualiza el estado de la partida y en localStorage
        infoPartida.textContent = `NOM: ${nom.value}, PUNTS: ${punts}, ESTAT PARTIDA: Partida finalitzada`;
        localStorage.setItem("partida", infoPartida.textContent);
        jocAcabat = true;
    }
});