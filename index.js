//variables
let nom = document.getElementById("nom");
let infoPartida = document.getElementById("partida");
let comencar = document.getElementById("començarPartida");
let borrar = document.getElementById("borrarPartida");
let infoNavegador = navigator.userAgent;
let infoURL = location.href;
let estatPartida = ""
let jocIniciat = false;
let jocAcabat = false;
let punts = 0;

function comencarPartida(){
    if(!jocIniciat) {
        if (nom.value === "") {
            alert("Has d'afegir un nom per poder començar a jugar");
        } else if (!isNaN(nom.value)) {
            alert("No pot ser un número");
        } else {
            jocIniciat = true;
            infoPartida.textContent = "NOM: " + nom.value + ", " + "PUNTS: " + punts + ", " + "ESTAT PARTIDA: " + estatPartida;
        }
    } else if(jocAcabat) {
        return;
    }
}

function borrarPartida() {
    infoPartida.textContent = "No hi ha cap partida en joc";
    nom.value = "";
    jocIniciat = false;
    jocAcabat = false;
}

document.getElementById("infoNavegador").textContent = infoNavegador;
document.getElementById("infoURL").textContent = infoURL;

