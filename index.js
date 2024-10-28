//variables
let nom = document.getElementById("nom");
let infoPartida = document.getElementById("partida");
let comencar = document.getElementById("començarPartida");
let borrar = document.getElementById("borrarPartida");
let infoNavegador = navigator.userAgent;
let infoURL = location.href;
let estatPartida = "En joc"
let jocIniciat = false;
let jocAcabat = false;
let punts = 0;
let finestra = "";

//events
comencar.addEventListener("click", comencarPartida);
borrar.addEventListener("click", borrarPartida);

if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#ffa500"
}else if(infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#a4eda5"
}


function comencarPartida(){
    if(!jocIniciat) {
        if (nom.value === "") {
            alert("Has d'afegir un nom per poder començar a jugar");
        } else {
            jocIniciat = true;
            infoPartida.textContent = "NOM: " + nom.value + ", " + "PUNTS: " + punts + ", " + "ESTAT PARTIDA: " + estatPartida;
            finestra = window.open("joc.html");
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
    finestra.close("joc.html");
}

document.getElementById("infoNavegador").textContent = infoNavegador;
document.getElementById("infoURL").textContent = infoURL;

