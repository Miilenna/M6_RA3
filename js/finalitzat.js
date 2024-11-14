// Obtiene la información del navegador
let infoNavegador = navigator.userAgent;

// Cambia el color de fondo dependiendo del navegador
if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#a4eda5"; 
} else if (infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#ffa500"; 
}