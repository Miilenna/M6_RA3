//variables
let nom = document.getElementById("nom");
let infoPartida = document.getElementById("partida");
let comencar = document.getElementById("començarPartida");
let borrar = document.getElementById("borrarPartida");
let infoNavegador = navigator.userAgent;
let infoURL = location.href;
let estatPartida = "En joc";
let jocIniciat = false;
let jocAcabat = false;
let punts = 0;
let finestra = "";

localStorage.setItem("nom", nom.value);
localStorage.setItem("partida", infoPartida.textContent);

//events
comencar.addEventListener("click", comencarPartida);
borrar.addEventListener("click", borrarPartida);

if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#ffa500";
} else if (infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#a4eda5";
}

function comencarPartida() {
    if (!jocIniciat) {
        if (nom.value === "") {
            alert("Has d'afegir un nom per poder començar a jugar");
        } else {
            jocIniciat = true;
            infoPartida.textContent = `NOM: ${nom.value}, PUNTS: ${punts}, ESTAT PARTIDA: ${estatPartida}`;
            document.cookie = "nom=" + nom.value;

            localStorage.setItem("nom", nom.value);
            localStorage.setItem("partida", infoPartida.textContent);

            finestra = window.open("joc.html");
        }
    } else if (jocAcabat) {
        return;
    } else if (finestra && !finestra.closed) {
        alert("Hi ha una partida començada");
    }
}

const channel = new BroadcastChannel('gameChannel');

channel.addEventListener('message', (event) => {
    if (event.data) {
        const estatRecibido = event.data.estat || "En joc";
        infoPartida.textContent = `NOM: ${event.data.jugador}, PUNTS: ${event.data.puntuacio}, ESTAT PARTIDA: ${estatRecibido}`;

        if (estatRecibido === "Partida finalitzada") {
            jocAcabat = true;
            jocIniciat = false;
            localStorage.setItem("partida", infoPartida.textContent);
        }
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

let nomJugador = getCookie("nom");

function borrarPartida() {
    // Borrar información de la partida en el almacenamiento
    localStorage.removeItem('nom');
    localStorage.removeItem('puntsActuals');
    localStorage.removeItem('colorFons');

    // Actualizar mensaje
    infoPartida.textContent = "No hi ha cap partida en joc";
    nom.value = "";
    jocIniciat = false;
    jocAcabat = false;

    // Cerrar la ventana del juego si está abierta
    if (finestra && !finestra.closed) {
        finestra.close();
    }
}

window.addEventListener('focus', () => {
    if (finestra && finestra.closed && jocIniciat) {
        estatPartida = "Partida finalitzada";
        infoPartida.textContent = `NOM: ${nom.value}, PUNTS: ${punts}, ESTAT PARTIDA: Partida finalitzada`;
        localStorage.setItem("partida", infoPartida.textContent);
        jocAcabat = true;
    }
});

document.getElementById("infoNavegador").textContent = infoNavegador;
document.getElementById("infoURL").textContent = infoURL;
