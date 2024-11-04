let nom = localStorage.getItem("nom");
let infoNavegador = navigator.userAgent;
let dades = document.getElementById("dades");

dades.textContent = nom;

if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#a4eda5"
}else if(infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#ffa500"
}
